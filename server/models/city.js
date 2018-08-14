const mongoose = require('mongoose');
const randomItem = require('random-item');

const CitySchema = new mongoose.Schema({
  geonameid: {
    type: Number,
  },
  name: {
    type: String,
  },
  localname: {
    type: String,
  },
  lng: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  country: {
    type: String,
  },
  countrycode: {
    type: String,
  },
  population: {
    type: Number,
  },
  lang: {
    type: String,
  },
  timezone: {
    type: String,
  },
});

module.exports = mongoose.model('City', CitySchema);
