const _ = require('underscore');
const randomItem = require('random-item');

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

const db = require('../db');


function findRecord() {
	return Promise.all([
		openweathermap.query(),
		db.City.find({population: {$gt: 500000} })
	])
	.then(results => {
		let weather = results[0];
		let cities = results[1];
	  let geonameids = _.map(cities, city => {
	    return city.geonameid;
	  });
	  let availables = _.filter(weather.list, entry => {
	    return _.contains(geonameids, entry.id);
	  });
	  let temperatures = _.map(availables, entry => {
	    return entry.main.temp;
	  });
	  let maxTemp = _.max(temperatures);
	  let candidates = _.filter(availables, entry => {
	    return entry.main.temp == maxTemp;
	  });
	  let record = randomItem(candidates);
		return Promise.all([
			record,
			db.City.findOne({geonameid: record.id})
		]);
	});
}

function findView(city) {
	return flickr.photos.search({
		text: city.name,
		format: 'json',
		nojsoncallback: 1,
		sort: 'relevance'
	})
	.then(async res => {
		let photos = res.body.photos.photo;
		let candidates = photos.slice(0, 10);
		for (candidate of candidates) {
			let sizes = await flickr.photos.getSizes({
				photo_id: candidate.id
			})
			.then(res => {
				return res.body.sizes.size;
			});
			let size = _.find(sizes, size => {
				return Math.abs(size.width - 1024) < 100;
			});
			if (size) {
				return size.source;
				break;
			}
		}
		return null;
	});
}


db.open()
	.then(findRecord)
	.then(results => {
		return Promise.all([
			results[0],
			findView(results[1])
		]);
	})
	.then(results => {
		return db.Record.create({
			geonameid: results[0].id,
			temp: results[0].main.temp,
			view: results[1]
		});
	})
	.then(record => {
		console.log(record);
		db.close()
	})
	.catch(error => {
		console.log(error);
		db.close();
	});
