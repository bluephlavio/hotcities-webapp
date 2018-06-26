require('dotenv')
	.config();

const _ = require('underscore');
const twit = require('twit');

const db = require('../db');

const Twitter = new twit({
	consumer_key: process.env.TWITTER_KEY,
	consumer_secret: process.env.TWITTER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

async function checkIfUpdateNeeded(newTweet) {
	let oldTweet = await db.Tweet.findOne()
		.sort({ timestamp: -1 })
		.exec();
	if (oldTweet) {
		return (oldTweet.geonameid !== newTweet.geonameid) || (newTweet.temp > oldTweet.temp);
	} else {
		return true;
	}
}

async function tweet() {
	await db.open();
	try {
		let record = await db.Record.findOne()
			.sort({ timestamp: -1 })
			.exec();
		let city = await db.City.findOne({
				geonameid: record.geonameid
			})
			.exec();
		let views = await db.View.find({
				geonameid: record.geonameid
			})
			.exec();
		let newTweet = db.Tweet({
			geonameid: city.geonameid,
			name: city.name,
			localname: city.localname,
			country: city.country,
			countrycode: city.countrycode,
			temp: record.temp,
			view: views[0].page
		});
		let updateNeeded = await checkIfUpdateNeeded(newTweet);
		if (updateNeeded) {
			console.log(newTweet.status);
			await Twitter.post('statuses/update', { status: newTweet.status });
			await newTweet.save();
		}
	} catch (error) {
		console.log(error);
	} finally {
		await db.close();
	}
}

tweet();