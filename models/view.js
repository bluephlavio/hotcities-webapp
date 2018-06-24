const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
	id: {
		type: String
	},
	username: {
		type: String
	},
	realname: {
		type: String
	}
}, {
	_id: false,
	toJSON: { virtuals: true }
});

OwnerSchema.virtual('page')
	.get(function() {
		return `https://flickr.com/${this.id}`;
	});

const ViewSchema = new mongoose.Schema({
	id: {
		type: Number,
		index: true
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
		type: Date
	},
	source: {
		type: String
	},
	owner: OwnerSchema,
	licenseid: {
		type: Number
	}
}, { toJSON: { virtuals: true } });

ViewSchema.virtual('license', {
	ref: 'License',
	localField: 'licenseid',
	foreignField: 'id',
	justOne: true
});

ViewSchema.virtual('page')
	.get(function() {
		return `https://flickr.com/${this.owner.id}/${this.id}`;
	});

module.exports = mongoose.model('View', ViewSchema);