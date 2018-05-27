const _ = require('underscore');
const randomItem = require('random-item');

const openweathermap = require('./openweathermap');
const flickr = require('./flickr');

const db = require('./db');

function selectWeatherRecord(openweathermap_data, cities) {
  let names = _.map(cities, city => {
    return city.name;
  });
  let availables = _.filter(openweathermap_data.list, entry => {
    return _.contains(names, entry.name);
  });
  let temperatures = _.map(availables, entry => {
    return entry.main.temp;
  });
  let maxTemp = _.max(temperatures);
  let candidates = _.filter(availables, entry => {
    return entry.main.temp == maxTemp;
  });
  return randomItem(candidates);
}

function selectPhoto(flickr_data) {
  let photos = flickr_data.photos.photo;
  let candidates = photos.slice(0, Math.max(photos.length, 1));
  return randomItem(candidates);
}


module.exports = {

  query: () => {
    return Promise.all([openweathermap.query(), db.City.find({})])
      .then(results => {
        return selectWeatherRecord(results[0], results[1]);
      })
      .then(weather => {
        return Promise.all([weather, flickr.query({
          text: weather.name
        }), db.City.findOne({
          name: weather.name
        })]);
      })
      .then(results => {
        let weather = results[0];
        let photo = selectPhoto(results[1]);
        let city = results[2];
        return {
          city: city._id,
          temp: weather.main.temp,
          view: flickr.buildPhotoUrl(photo.farm, photo.server, photo.id, photo.secret)
        }
      })
      .then(record => {
        return db.Record.create(record);
      })
      .then(record => {
        console.log(record);
      })
      .catch(error => {
        console.log(error);
      });
  },

  start: function(period, callback) {
    function loop() {
      module.exports.query(data => {
        setTimeout(loop, period);
        callback(data);
      });
    }
    loop();
  }

}