import City from './models/city';

async function findCityByGeoNameId(geonameid) {
  const city = await City.findOne({ geonameid });
  return city;
}

async function findCityByName(name) {
  const city = await City.findOne({ name });
  return city;
}

export default {
  findCityByGeoNameId,
  findCityByName,
};
