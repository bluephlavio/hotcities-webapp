const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
	id: {
		type: Number
	},
	name: String,
	abbr: String,
	link: String
});

module.exports = mongoose.model('License', LicenseSchema);