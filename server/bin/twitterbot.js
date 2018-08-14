require('dotenv')
  .config();

const _ = require('underscore');
const twit = require('twit');

const db = require('../db');

const Twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function checkIfUpdateNeeded(newTweet) {
  const oldTweet = await db.Tweet.findOne()
    .sort({ timestamp: -1 })
    .exec();
  if (oldTweet) {
    return (oldTweet.geonameid !== newTweet.geonameid) || (newTweet.temp > oldTweet.temp);
  }
  return true;
}

async function tweet() {
  await db.open();
  try {
    const record = await db.Record.findOne()
      .sort({ timestamp: -1 })
      .exec();
    const city = await db.City.findOne({
      geonameid: record.geonameid,
    })
      .exec();
    let views = await db.View.find({
      geonameid: record.geonameid,
    })
      .exec();
    views = _.sortBy(views, view => -view.relevance);
    const newTweet = db.Tweet({
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
    await db.close();
  }
}

tweet();
