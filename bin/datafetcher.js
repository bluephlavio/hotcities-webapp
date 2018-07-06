require('dotenv')
	.config();

// const openweathermap = require('../openweathermap');
// const flickr = require('../flickr');
//
// const db = require('../db');
//
// async function fetchRecord() {
// 	await db.open();
// 	try {
// 		let record = await openweathermap.findRecord();
// 		await db.Record.create({
// 			geonameid: record.id,
// 			temp: record.main.temp
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		await db.close();
// 	}
// }
//
// async function fetchViews() {
// 	await db.open();
// 	try {
// 		let record = await db.Record.findOne()
// 			.sort({ timestamp: -1 });
// 		let city = await db.City.findOne({ geonameid: record.id });
// 		console.log(city);
// 		let params = flickr.getSearchParams(city);
// 		let views = await flickr.fetchViews(city, params);
// 		console.log(views);
// 		let now = Date.now();
// 		for (const [i, view] of views.entries()) {
// 			view.relevance = now - i + 1000 * view.isfavorite;
// 			await db.View.findOneAndUpdate({
// 				id: view.id
// 			}, view, {
// 				upsert: true,
// 				setDefaultsOnInsert: true
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		await db.close();
// 	}
// }

const fetchRecord = require('./recordfetcher');
const fetchViews = require('./viewsfetcher');

async function fetchData() {
	await fetchRecord();
	await fetchViews();
}

// await db.open();
// try {
// 	let record = await openweathermap.findRecord();
// 	console.log(record);
// 	await db.Record.create({
// 		geonameid: record.id,
// 		temp: record.main.temp
// 	});
// 	let city = await db.City.findOne({ geonameid: record.id });
// 	console.log(city);
// 	let params = flickr.getSearchParams(city);
// 	let views = await flickr.fetchViews(city, params);
// 	console.log(views);
// 	let now = Date.now();
// 	for (const [i, view] of views.entries()) {
// 		view.relevance = now - i + 1000 * view.isfavorite;
// 		await db.View.findOneAndUpdate({
// 			id: view.id
// 		}, view, {
// 			upsert: true,
// 			setDefaultsOnInsert: true
// 		});
// 	}
// } catch (error) {
// 	console.log(error);
// } finally {
// 	await db.close();
// 	}
// }

if (require.main === module) {
	fetchData();
}