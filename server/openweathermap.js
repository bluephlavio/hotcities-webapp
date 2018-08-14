const request = require('request');
const buildUrl = require('build-url');
const _ = require('underscore');
const randomItem = require('random-item');

const db = require('./db');

function queryUrl(params) {
  return buildUrl('http://api.openweathermap.org', {
    path: 'data/2.5/box/city',
    queryParams: _.defaults(params, {
      appid: process.env.OPENWEATHERMAP_KEY,
      bbox: [-180, -90, 180, 90, 12],
    }),
  });
}

function query() {
  return new Promise((resolve, reject) => {
    request(queryUrl({}), (err, res, body) => {
      const data = JSON.parse(body);
      resolve(data);
    });
  });
}

async function findRecord() {
  const weather = await query();
  const cities = await db.City.find();
  const geonameids = _.map(cities, city => city.geonameid);
  const availables = _.filter(weather.list, entry => _.contains(geonameids, entry.id));
  const temperatures = _.map(availables, entry => entry.main.temp);
  const maxTemp = _.max(temperatures);
  const candidates = _.filter(availables, entry => entry.main.temp == maxTemp);
  return randomItem(candidates);
}

async function findRecordAndSave() {
  let record;
  try {
    openweathermapRecord = await findRecord();
    record = await db.Record.create({
      geonameid: openweathermapRecord.id,
      temp: openweathermapRecord.main.temp,
    });
  } catch (error) {
    console.log(error);
  } finally {
    return record;
  }
}

module.exports = {
  findRecord,
  findRecordAndSave,
};
