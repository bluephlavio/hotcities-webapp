const buildUrl = require('build-url');
const request = require('request');
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

  query: function(params, callback) {
    request.get(queryUrl(city), (error, response, body) => {
      let data = JSON.parse(body);
      let photos = _.map(data.photos.photo, photo => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
      });
      callback(photos);
    });
  }

}