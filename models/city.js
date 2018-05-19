const mongoose = require('mongoose');
const formatCoords = require('format-coords');


const CitySchema = new mongoose.Schema({
  name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  country: { type: String },
  population: { type: Number },
  photos: { type: [String], default: [] }
});

CitySchema.virtual('coords').get(function() {
  return formatCoords(lat, lon).format('DD MM ss X', {latLonSeparator: ', ',  decimalPlaces: 0});
});


module.exports = mongoose.model('City', CitySchema);
