const request = require('request');
const buildUrl = require('build-url');
const _ = require('underscore');
const randomItem = require('random-item');

const db = require('./db');

function queryUrl(params) {
	return buildUrl('http://api.openweathermap.org', {
		path: 'data/2.5/box/city',
		queryParams: _.defaults(params, {
			appid: process.env.OPENWEATHERMAP_KEY,
			bbox: [-180, -90, 180, 90, 12]
		})
	});
}

function query() {
	return new Promise((resolve, reject) => {
		request(queryUrl({}), (err, res, body) => {
			let data = JSON.parse(body);
			resolve(data);
		});
	});
}

async function findRecord() {
	let weather = await query();
	let cities = await db.City.find();
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
	return randomItem(candidates);
}

async function findRecordAndSave() {
	let record;
	try {
		openweathermapRecord = await findRecord();
		record = await db.Record.create({
			geonameid: openweathermapRecord.id,
			temp: openweathermapRecord.main.temp
		});
	} catch (error) {
		console.log(error);
	} finally {
		return record;
	}
}

module.exports = {
	findRecord,
	findRecordAndSave
}