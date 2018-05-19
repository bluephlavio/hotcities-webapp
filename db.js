const mongoose = require('mongoose');

const City = require('./models/city');
const Record = require('./models/record');

const dbURI = 'mongodb://localhost/hotcities';

mongoose.connect(dbURI);


module.exports = {

  City: City,
  Record: Record,

  connection: mongoose.connection,

  mergeData: (city, record) => {
    return {
      city: city.name,
      view: city.view,
      coords: city.coords,
      temp: `${Math.round(record.temp)} °C`
    }
  },

  fetchCurrent: callback => {
    Record.findOne({}, {}, { sort: { timestamp: -1}}, (err, record) => {
      City.findById({ _id: record.city }, (err, city) => {
        let data = module.exports.mergeData(city, record);
        callback(data);
      });
    });
  }

}
