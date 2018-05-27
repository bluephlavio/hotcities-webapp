const mongoose = require('mongoose');
const formatcoords = require('formatcoords');
const randomItem = require('random-item');

const CitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  country: {
    type: String
  },
  population: {
    type: Number
  },
  records: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record'
  }]
});

module.exports = mongoose.model('City', CitySchema);