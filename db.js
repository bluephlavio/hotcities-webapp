require('dotenv')
  .config();

const mongoose = require('mongoose');

const City = require('./models/city');
const Record = require('./models/record');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from the database.');
});

module.exports.connection = mongoose.connection;
module.exports.City = City;
module.exports.Record = Record;