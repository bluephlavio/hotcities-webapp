require('dotenv')
	.config();

const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const twit = require('twit');

const db = require('../db');

const Twitter = new twit({
	consumer_key: process.env.TWITTER_KEY,
	consumer_secret: process.env.TWITTER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const statusFile = path.join(__dirname, 'status.json');

function taggify(tags) {
	return _.map(tags, tag => {
			return `#${tag.replace(/(\s|\')/g, '')}`;
		})
		.join(' ');
}

function tweetify(status) {
	let temp = `${Math.round(status.temp)} °C`;
	let name = status.name;
	let code = status.countrycode;
	let tags = taggify(
		_.filter([
			status.name,
			status.localname,
			status.country
		], entry => {
			return entry;
		})
	);
	let view = status.view;
	return `${temp} in ${name} (${code}) now! ${tags} ${view}`;
}

function updateNeeded(newStatus) {
	if (fs.existsSync(statusFile)) {
		let oldStatus = JSON.parse(fs.readFileSync(statusFile));
		if (newStatus.name !== oldStatus.name) {
			return true;
		} else {
			return false;
		}
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
		let view = views[0];
		let newStatus = {
			name: city.name,
			localname: city.localname,
			country: city.country,
			countrycode: city.countrycode,
			temp: record.temp,
			view: view.photopage
		}
		if (updateNeeded(newStatus)) {
			console.log(tweetify(newStatus));
			await Twitter.post('statuses/update', { status: tweetify(newStatus) });
			fs.writeFileSync(statusFile, JSON.stringify(newStatus));
		}
	} catch (error) {
		console.log(error);
	} finally {
		await db.close();
	}
}

tweet();