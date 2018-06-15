require('dotenv')
	.config();

const _ = require('underscore');
const twit = require('twit');
const flickr = require('../flickr');
const db = require('../db');
const fmt = require('../helpers/formatter');

const Twitter = new twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const flickrRegex =
	/https:\/\/farm(\d)\.staticflickr\.com\/(\d+)\/(\d+)_(\w+)_\w\.(\w+)/g;

db.open()
	.then(() => {
		return db.Record.findOne()
			.sort({ timestamp: -1 })
			.exec()
	})
	.then(record => {
		let match = flickrRegex.exec(record.view);
		return Promise.all([
			record,
			db.City.findOne({ geonameid: record.geonameid }),
			flickr.photos.getInfo({
				photo_id: match[3],
				secret: match[4]
			})
		]);
	})
	.then(results => {
		let record = results[0];
		let city = results[1];
		let res = results[2];
		let all_urls = res.body.photo.urls.url;
		let candidate_urls = _.filter(all_urls, entry => {
			return entry.type === 'photopage';
		});
		if (candidate_urls.length) {
			let url = candidate_urls[0]._content;
			let status = `${fmt.temp(record.temp)} in #${fmt.names(city.name, city.localname)} (${city.countrycode}) now! ${url}`;
			console.log(status);
			return Twitter.post('statuses/update', { status: status });
		} else {
			return null;
		}
	})
	.then(() => {
		db.close();
	})
	.catch(error => {
		console.log(error);
		db.close();
	})