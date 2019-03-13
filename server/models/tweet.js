import mongoose from 'mongoose';
import _ from 'underscore';

const TweetSchema = new mongoose.Schema({
  geonameid: {
    type: Number,
  },
  name: {
    type: String,
  },
  localname: {
    type: String,
  },
  country: {
    type: String,
  },
  countrycode: {
    type: String,
  },
  temp: {
    type: Number,
  },
  view: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

TweetSchema.virtual('names')
  .get(
    function () {
      if (this.localname && this.localname !== this.name) {
        return [this.name, this.localname];
      }
      return [this.name];
    },
  );

TweetSchema.virtual('tags')
  .get(
    function () {
      const tags = this.names;
      tags.push(this.country);
      return tags;
    },
  );

TweetSchema.virtual('status')
  .get(
    function () {
      const temp = `${Math.round(this.temp)} °C`;
      const name = this.name;
      const code = this.countrycode;
      const tags = _.map(this.tags, tag => `#${tag.replace(/(\s|\')/g, '')}`)
        .join(' ');
      const view = this.view;
      return `${temp} in ${name} (${code}) now! ${tags} ${view}`;
    },
  );

export default mongoose.model('Tweet', TweetSchema);
