const mongoose = require('mongoose');
const cities = require('all-the-cities');
const async = require('async');
const _ = require('underscore');

const City = require('./models/city');
const Record = require('./models/record');

// const dbUri = 'mongodb://localhost/hotcities';
const dbUri = process.env.DB_URI;
const connection = mongoose.connection;

function fetchCities(minPopulation) {
  console.log(`Fetching cities with more than ${minPopulation}...`);
  let mCities = cities.filter(city => {
    return city.population > minPopulation;
  });
  console.log(`${mCities.length} cities found.`);
  return _.map(mCities, city => {
    console.log(`Retrieving data for ${city.name}...`);
    return {
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      population: city.population
    }
  });
}

function importCities(data, callback) {
  let todo = [];
  let save = function(entry) {
    return function(callback) {
      entry.save(callback);
    }
  };
  _.forEach(data, city => {
    console.log(`Storing data for ${city.name}...`);
    let entry = new City(city);
    todo.push(save(entry));
  });
  async.series(todo, callback);
}


module.exports = {

  City: City,
  Record: Record,

  connection: connection,

  init: (minPopulation, callback) => {
    mongoose.connect(dbUri);
    connection.on('connected', () => {
      console.log('Connected to the database.');
      City.count({}, (err, count) => {
        if (count == 0) {
          let mCities = fetchCities(minPopulation);
          importCities(mCities, callback);
        } else {
          callback();
        }
      });
    });
  },

  mergeData: (city, record) => {
    return {
      city: city.name,
      view: city.view,
      coords: city.coords,
      temp: `${Math.round(record.temp)} °C`
    }
  },

  fetchCurrent: callback => {
    Record.findOne({}, {}, { sort: { timestamp: -1 } }, (err, record) => {
      if (record) {
        City.findById({ _id: record.city }, (err, city) => {
          data = module.exports.mergeData(city, record);
          callback(data);
        });
      } else {
        callback(false);
      }
    });
  }

}
