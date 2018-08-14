require('dotenv')
  .config();

const geoname = require('../geoname');
const openweathermap = require('../openweathermap');
const flickr = require('../flickr');
const db = require('../db');

async function fetchData() {
  await db.open();
  const record = await openweathermap.findRecordAndSave();
  console.log(record);
  const city = await geoname.findCityByGeoNameId(record.geonameid);
  console.log(city);
  const views = await flickr.fetchViewsAndSave(city, {});
  console.log(`${views.length} views found.`);
  await db.close();
}

if (require.main === module) {
  fetchData();
}
