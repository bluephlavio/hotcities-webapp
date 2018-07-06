require('dotenv')
	.config();

const flickr = require('../flickr');

const db = require('../db');

async function fetchViews(geonameid = undefined) {
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
		let views = await flickr.fetchViews(city, params);
		console.log(views);
		let now = Date.now();
		for (const [i, view] of views.entries()) {
			view.relevance = now - i + 1000 * view.isfavorite;
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

if (require.main === module) {
	fetchViews(Number(process.argv[2]));
}

module.exports = fetchViews;