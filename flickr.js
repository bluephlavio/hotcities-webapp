require('dotenv')
  .config();

const request = require('request');
const buildUrl = require('build-url');
const _ = require('underscore');

function queryUrl(params) {
  return buildUrl('https://api.flickr.com/', {
    path: 'services/rest/',
    queryParams: _.defaults(params, {
      method: 'flickr.photos.search',
      api_key: process.env.FLICKR_KEY,
      format: 'json',
      nojsoncallback: 1,
      sort: 'relevance',
      accuracy: 11
    })
  });
}

module.exports = {

  query: params => {
    return new Promise((resolve, reject) => {
      request.get(queryUrl(params), (err, res, body) => {
        let data = JSON.parse(body);
        resolve(data);
      });
    });
  },

  buildPhotoUrl: (farm, server, id, secret) => {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`
  }

}