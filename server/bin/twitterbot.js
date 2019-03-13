import _ from 'underscore';
import mongoose from 'mongoose';
import Twit from 'twit';
import Record from '../models/record';
import City from '../models/city';
import View from '../models/view';
import Tweet from '../models/tweet';
import config from '../../config/config';

require('dotenv')
  .config();

const Twitter = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret,
});

async function checkIfUpdateNeeded(newTweet) {
  const oldTweet = await Tweet.findOne()
    .sort({ timestamp: -1 })
    .exec();
  if (oldTweet) {
    return (oldTweet.geonameid !== newTweet.geonameid) || (newTweet.temp > oldTweet.temp);
  }
  return true;
}

async function tweet() {
  await mongoose.connect(config.db.uri);
  try {
    const record = await Record.findOne()
      .sort({ timestamp: -1 })
      .exec();
    const city = await City.findOne({
      geonameid: record.geonameid,
    })
      .exec();
    let views = await View.find({
      geonameid: record.geonameid,
    })
      .exec();
    views = _.sortBy(views, view => -view.relevance);
    const newTweet = Tweet({
      geonameid: city.geonameid,
      name: city.name,
      localname: city.localname,
      country: city.country,
      countrycode: city.countrycode,
      temp: record.temp,
      view: views[0].page,
    });
    const updateNeeded = await checkIfUpdateNeeded(newTweet);
    if (updateNeeded) {
      console.log(newTweet.status);
      await Twitter.post('statuses/update', { status: newTweet.status });
      await newTweet.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

tweet();
