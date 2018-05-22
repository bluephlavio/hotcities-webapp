const buildUrl = require('build-url');


function queryUrl(zoom) {
  return buildUrl('http://api.openweathermap.org', {
    path: 'data/2.5/box/city',
    queryParams: {
      appid: process.env.OPENWEATHERMAP_KEY,
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