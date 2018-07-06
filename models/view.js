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
	geonameid: {
		type: Number,
		ref: 'City'
	},
	title: {
		type: String
	},
	tags: {
		type: [String]
	},
	views: {
		type: Number
	},
	taken: {
		type: Date
	},
	src: {
		type: String
	},
	owner: OwnerSchema,
	licenseid: {
		type: Number
	},
	relevance: {
		type: Number,
		default: Date.now
	},
	isfavorite: {
		type: Number,
		default: 0
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