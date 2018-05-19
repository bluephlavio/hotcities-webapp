const _ = require('underscore');
const randomItem = require('random-item');

const openweathermap = require('./openweathermap');
const flickr = require('./flickr');

const db = require('./db');


function selectByTemp(data) {
  let hottest = _.max(data, entry => {
    return entry.weather.temp;
  });
  let hottests = _.filter(data, entry => {
    return entry.weather.temp == hottest.weather.temp;
  });
  return randomItem(hottests);
}

function selectByName(data, name) {
  return _.find(data, entry => {
    return entry.city.name.toLowerCase() == name.toLowerCase();
  });
}

function selectPhotos(photos) {
  return photos.slice(0, Math.max(photos.length / 100, 1));
}


module.exports = {

  query: function(callback) {
    openweathermap.query(data => {
      // let hottest = selectByTemp(weather);
      let winner = selectByName(data, 'Dubai');
      flickr.query(winner.city, photos => {
        db.City.findOneAndUpdate({ _id: winner.city._id }, { photos: selectPhotos(photos) }, {}, (err, city) => {
          let record = new db.Record({
            city: city._id,
            temp: winner.weather.main.temp
          });
          record.save(() => {
            callback(db.mergeData(city, record));
          });
        });
      });
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
