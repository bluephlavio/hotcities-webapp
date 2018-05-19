const mongoose = require('mongoose');
const formatcoords = require('formatcoords');


const CitySchema = new mongoose.Schema({
  name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  country: { type: String },
  population: { type: Number },
  photos: { type: [String], default: [] }
});

CitySchema.virtual('coords').get(function() {
  return formatcoords(lat, lon).format('DD MM ss X', {latLonSeparator: ', ',  decimalPlaces: 0});
});


module.exports = mongoose.model('City', CitySchema);
