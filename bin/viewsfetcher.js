require('dotenv')
	.config();

const flickr = require('../flickr');

const db = require('../db');

async function fetchViews(geonameid = undefined, limit = 10) {
	await db.open();
	try {
		let city;
		if (geonameid) {
			city = await db.City.findOne({ geonameid: geonameid });
		} else {
			let record = await db.Record.findOne()
				.sort({ timestamp: -1 });
			city = await db.City.findOne({ geonameid: record.geonameid });
		}
		console.log(city);
		let params = flickr.getSearchParams(city);
		let views = await flickr.fetchViews(city, params, limit = limit);
		console.log(views.length + ' views found.');
		let now = Date.now();
		for (const [i, view] of views.entries()) {
			view.timestamp = now;
			view.rank = i;
			await db.View.findOneAndUpdate({
				id: view.id
			}, view, {
				upsert: true,
				setDefaultsOnInsert: true,
			});
		}
	} catch (error) {
		console.log(error);
	} finally {
		await db.close();
	}
}

if (require.main === module) {
	let geonameid = process.argv[2] ? Number(process.argv[2]) : undefined
	let limit = process.argv[3] ? Number(process.argv[3]) : 10
	fetchViews(geonameid, limit);
}

module.exports = fetchViews;