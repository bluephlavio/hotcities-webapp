const db = require('./db');

async function findCityByGeoNameId(geonameid) {
	let city;
	try {
		city = await db.City.findOne({ geonameid: geonameid });
	} catch (error) {
		console.log(error);
	} finally {
		return city;
	}
}

module.exports = {
	findCityByGeoNameId
}