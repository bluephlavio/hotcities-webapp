require('dotenv')
  .config();

const Flickr = require('flickr-sdk');

module.exports = new Flickr(process.env.FLICKR_KEY);
