const allTheCities = require('all-the-cities');

const db = require('../db');

const minPopulation = 500000;

function init() {
  console.log(`Fetching cities with more than ${minPopulation}...`);
  let cities = allTheCities.filter(city => {
    return city.population > minPopulation;
  });
  console.log(`${cities.length} cities found.`);
  db.City.create(cities)
    .then(cities => {
      console.log('Cities stored in database.');
      db.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
}

init();