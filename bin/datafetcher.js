require('dotenv')
	.config();

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

const db = require('../db');


// async function findRecord() {
// 	let weather = await openweathermap.query();
// 	let cities = await db.City.find({ population: { $gt: 500000 } });
// 	let geonameids = _.map(cities, city => {
// 		return city.geonameid;
// 	});
// 	let availables = _.filter(weather.list, entry => {
// 		return _.contains(geonameids, entry.id);
// 	});
// 	let temperatures = _.map(availables, entry => {
// 		return entry.main.temp;
// 	});
// 	let maxTemp = _.max(temperatures);
// 	let candidates = _.filter(availables, entry => {
// 		return entry.main.temp == maxTemp;
// 	});
// 	return randomItem(candidates);
// }
//
// function getFlickrSearchParams(city) {
// 	return {
// 		has_geo: '1',
// 		lat: city.lat,
// 		lon: city.lng,
// 		radius: 30,
// 		license: '1,2,4,5,7,9,10',
// 		sort: 'relevance',
// 		per_page: 100,
// 		format: 'json'
// 	};
// }
//
// async function fetchViews(city, limit = 10) {
// 	let res = await flickr.photos.search(getFlickrSearchParams(city));
// 	let candidates = res.body.photos.photo;
// 	let views = [];
// 	for (candidate of candidates) {
// 		let sizes = await flickr.photos.getSizes({
// 				photo_id: candidate.id
// 			})
// 			.then(res => {
// 				return res.body.sizes.size;
// 			});
// 		let size = _.find(sizes, entry => {
// 			return Math.abs(entry.width - 1024) < 100;
// 		});
// 		if (size) {
// 			let info = await flickr.photos.getInfo({
// 					photo_id: candidate.id,
// 					secret: candidate.secret
// 				})
// 				.then(res => {
// 					return res.body;
// 				});
// 			candidate.geonameid = city.geonameid;
// 			candidate.url = size.url;
// 			candidate.src = size.source;
// 			candidate.taken = info.photo.dates.taken;
// 			candidate.views = Number(info.photo.views);
// 			candidate.licenseid = Number(info.photo.license);
// 			candidate.tags = _.map(info.photo.tags.tag, tag => { return tag._content; });
// 			candidate.owner = {
// 				id: info.photo.owner.nsid,
// 				username: info.photo.owner.username,
// 				realname: info.photo.owner.realname
// 			}
// 			let urls = _.filter(info.photo.urls.url, entry => {
// 				return entry.type == 'photopage';
// 			});
// 			if (urls) {
// 				candidate.photopage = urls[0]._content;
// 			}
// 			views.push(candidate);
// 		}
// 	}
// 	return views;
// }

async function fetchData() {
	await db.open();
	try {
		let record = await openweathermap.findRecord();
		console.log(record);
		await db.Record.create({
			geonameid: record.id,
			temp: record.main.temp
		});
		let city = await db.City.findOne({ geonameid: record.id });
		console.log(city);
		let views = await flickr.fetchViews(city);
		console.log(views);
		for (view of views) {
			await db.View.findOneAndUpdate({
				id: view.id
			}, view, {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true
			});
		}
	} catch (error) {
		console.log(error);
	} finally {
		await db.close();
	}
}

fetchData();