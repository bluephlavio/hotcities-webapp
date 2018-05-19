const buildUrl = require('build-url');
const request = require('request');
const async = require('async');
const _ = require('underscore');

const db = require('./db');


function queryUrl(zoom) {
    return buildUrl('http://api.openweathermap.org', {
      path: 'data/2.5/box/city',
      queryParams: {
        appid: 'db6179424eb333db43c013644877d4dd',
        bbox: [-180, -90, 180, 90, zoom]
      }
    });
}

function fetchWeatherInfo(data, city) {
  let weather = _.find(data.list, entry => {
    return entry.name == city.name;
  });
  return {
    city: city,
    weather: weather
  }
}


module.exports = {

  query: function(callback) {
    request(queryUrl(12), (error, responde, body) => {
      let data = JSON.parse(body);
      let availables = _.map(data.list, entry => {
        return entry.name;
      });
      db.CityModel.find({ name: {$in: availables}}, (err, cities) => {
        let weather = _.map(cities, city => {
          return fetchWeatherInfo(data, city);
        });
        callback(weather);
      });
    });
  }

}
