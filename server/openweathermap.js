import request from 'request';
import buildUrl from 'build-url';
import _ from 'underscore';
import randomItem from 'random-item';
import City from './models/city';
import Record from './models/record';
import config from '../config/config';

function queryUrl(params) {
  return buildUrl('http://api.openweathermap.org', {
    path: 'data/2.5/box/city',
    queryParams: _.defaults(params, {
      appid: config.openweathermap.consumer_key,
      bbox: [-180, -90, 180, 90, 12],
    }),
  });
}

function query() {
  return new Promise((resolve, reject) => {
    request(queryUrl({}), (err, res, body) => {
      if (err) reject();
      const data = JSON.parse(body);
      resolve(data);
    });
  });
}

async function findRecord() {
  const weather = await query();
  const cities = await City.find();
  const geonameids = _.map(cities, city => city.geonameid);
  const availables = _.filter(weather.list, entry => _.contains(geonameids, entry.id));
  const temperatures = _.map(availables, entry => entry.main.temp);
  const maxTemp = _.max(temperatures);
  const candidates = _.filter(availables, entry => entry.main.temp === maxTemp);
  return randomItem(candidates);
}

async function findRecordAndSave() {
  const openweathermapRecord = await findRecord();
  const record = await Record.create({
    geonameid: openweathermapRecord.id,
    temp: openweathermapRecord.main.temp,
  });
  return record;
}

export default {
  findRecord,
  findRecordAndSave,
};
