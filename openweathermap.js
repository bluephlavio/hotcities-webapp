const buildUrl = require('build-url');


function queryUrl(zoom) {
    return buildUrl('http://api.openweathermap.org', {
      path: 'data/2.5/box/city',
      queryParams: {
        appid: 'db6179424eb333db43c013644877d4dd',
        bbox: [-180, -90, 180, 90, zoom]
      }
    });
}


module.exports = {

  query: callback => {
    request(queryUrl(zoom), (error, responde, body) => {
      let data = JSON.parse(body);
      callback(data);
    });
  }

}
