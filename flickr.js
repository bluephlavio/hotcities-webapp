const buildUrl = require('build-url');
const request = require('request');
const _ = require('underscore');


function queryUrl(city) {
  return buildUrl('https://api.flickr.com/', {
    path: 'services/rest/',
    queryParams: {
      method: 'flickr.photos.search',
      api_key: 'fb3e98ab019a7e337d5b471bca29d4b3',
      format: 'json',
      nojsoncallback: 1,
      sort: 'relevance',
      accuracy: 11,
      text: city.name,
    }
  });
}


module.exports = {

  query: function(city, callback) {
    request.get(queryUrl(city), (error, response, body) => {
      let data = JSON.parse(body);
      let photos = _.map(data.photos.photo, photo => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
      });
      callback(photos);
    });
  }

}
