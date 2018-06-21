const mongoose = require('mongoose');

const City = require('./models/city');
const Record = require('./models/record');
const View = require('./models/view');
const Tweet = require('./models/tweet');

mongoose.Promise = global.Promise;

module.exports.connection = mongoose.connection;
module.exports.open = () => {
	return mongoose.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log('Connected to the database.');
		});
};
module.exports.close = () => {
	return mongoose.connection.close()
		.then(() => {
			console.log('Disconnected from the database.');
		});
}

module.exports.City = City;
module.exports.Record = Record;
module.exports.View = View;
module.exports.Tweet = Tweet;