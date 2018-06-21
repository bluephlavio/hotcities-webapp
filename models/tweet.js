const mongoose = require('mongoose');
const _ = require('underscore');

const TweetSchema = new mongoose.Schema({
	geonameid: {
		type: Number,
	},
	name: {
		type: String
	},
	localname: {
		type: String
	},
	country: {
		type: String
	},
	countrycode: {
		type: String
	},
	temp: {
		type: Number
	},
	view: {
		type: String
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

TweetSchema.virtual('names')
	.get(
		function() {
			if (this.localname && this.localname !== this.name) {
				return [this.name, this.localname];
			} else {
				return [this.name];
			}
		}
	)

TweetSchema.virtual('tags')
	.get(
		function() {
			let tags = this.names;
			tags.push(this.country);
			return tags;
		}
	);

TweetSchema.virtual('status')
	.get(
		function() {
			let temp = `${Math.round(this.temp)} °C`;
			let name = this.name;
			let code = this.countrycode;
			let tags = _.map(this.tags, tag => {
					return `#${tag.replace(/(\s|\')/g, '')}`;
				})
				.join(' ');
			let view = this.view;
			return `${temp} in ${name} (${code}) now! ${tags} ${view}`;
		}
	);

module.exports = mongoose.model('Tweet', TweetSchema);