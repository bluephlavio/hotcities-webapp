require('dotenv')
	.config();

const openweathermap = require('../openweathermap');

const db = require('../db');

async function fetchRecord() {
	await db.open();
	try {
		let record = await openweathermap.findRecord();
		await db.Record.create({
			geonameid: record.id,
			temp: record.main.temp
		});
		console.log(record);
	} catch (error) {
		console.log(error);
	} finally {
		await db.close();
	}
}

if (require.main === module) {
	fetchRecord();
}

module.exports = fetchRecord;