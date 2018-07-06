require('dotenv')
	.config();

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

const db = require('../db');

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
		let params = flickr.getSearchParams(city);
		let views = await flickr.fetchViews(city, params);
		console.log(views);
		let now = Date.now();
		for (const [i, view] of views.entries()) {
			view.relevance = now - i
			await db.View.findOneAndUpdate({
				id: view.id
			}, view, {
				upsert: true,
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