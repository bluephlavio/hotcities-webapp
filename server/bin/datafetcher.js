import mongoose from 'mongoose';
import geoname from '../geoname';
import openweathermap from '../openweathermap';
import flickr from '../flickr';
import config from '../../config/config';

require('dotenv')
  .config();

async function fetchData() {
  await mongoose.connect(config.db.uri);
  const record = await openweathermap.findRecordAndSave();
  console.log(record);
  const city = await geoname.findCityByGeoNameId(record.geonameid);
  console.log(city);
  const views = await flickr.fetchViewsAndSave(city, {});
  console.log(`${views.length} views found.`);
  await mongoose.connection.close();
}

if (require.main === module) {
  fetchData();
}
