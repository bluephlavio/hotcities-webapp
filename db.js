const mongoose = require('mongoose');

const City = require('./models/city');
const Record = require('./models/record');

const dbURI = 'mongodb://localhost/hotcities';

mongoose.connect(dbURI);

module.exports = {

  City: City,
  Record: Record,

  connection: mongoose.connection,

  fetchCurrent: callback => {
    Record.findOne({}, {}, { sort: { timestamp: -1}}, (err, record) => {
      City.findById({ _id: record.city }, (err, city) => {
        callback({
          city: city,
          record: record,
        });
      });
    });
  }

}
