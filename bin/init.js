const mongoose = require('mongoose');
const async = require('async');
const _ = require('underscore');

const cities = require('all-the-cities');

const db = require('../db');


let minPopulation = 500000;

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
    };
  });
}

function importCities(data) {
  let todo = [];
  let save = function(entry) {
    return function(callback) {
      entry.save(callback);
    }
  };
  _.forEach(data, city => {
    console.log(`Storing data for ${city.name}...`);
    let entry = new db.City(city);
    todo.push(save(entry));
  });
  async.series(todo, () => {
    console.log('Closing database...');
    db.connection.close(() => {
      console.log('Database close.');
    });
  });
}


db.connection.on('connected', () => {
  console.log('Connected to the database.');
  db.City.remove({}, () => {
    let mCities = fetchCities(minPopulation);
    importCities(mCities);
  });
});
