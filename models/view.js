const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
	id: {
		type: Number
	},
	owner: {
		type: String
	},
	secret: {
		type: String
	},
	server: {
		type: String
	},
	farm: {
		type: String
	},
	geonameid: {
		type: Number,
		ref: 'City'
	},
	title: {
		type: String
	},
	views: {
		type: Number
	},
	taken: {
		type: Date,
		default: Date.now
	},
	url: {
		type: String
	},
	source: {
		type: String
	},
	photopage: {
		type: String
	}
});

module.exports = mongoose.model('View', ViewSchema);