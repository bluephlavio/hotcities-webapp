require('dotenv')
  .config();

const request = require('request');
const buildUrl = require('build-url');
const _ = require('underscore');

function queryUrl(params) {
  return buildUrl('http://api.openweathermap.org', {
    path: 'data/2.5/box/city',
    queryParams: _.defaults(params, {
      appid: process.env.OPENWEATHERMAP_KEY,
      bbox: [-180, -90, 180, 90, 10]
    })
  });
}

module.exports = {

  query: () => {
    return new Promise((resolve, reject) => {
      request(queryUrl({}), (err, res, body) => {
        let data = JSON.parse(body);
        resolve(data);
      });
    });
  }

}