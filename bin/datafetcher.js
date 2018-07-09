require('dotenv')
	.config();

const geoname = require('../geoname');
const openweathermap = require('../openweathermap');
const flickr = require('../flickr');
const db = require('../db');

async function fetchData() {
	await db.open();
	let record = await openweathermap.findRecordAndSave();
	console.log(record);
	let city = await geoname.findCityByGeoNameId(record.geonameid);
	console.log(city);
	let views = await flickr.fetchViewsAndSave(city, {});
	console.log(`${views.length} views found.`);
	await db.close();
}

if (require.main === module) {
	fetchData();
}