const express = require('express');
const router = express.Router();

const _ = require('underscore');

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

router.get('/openweathermap', (req, res) => {
  openweathermap.query()
    .then(data => {
      res.json(data);
    })
		.catch(error => {
			console.log(error);
		});
});

router.get('/flickr', (req, res) => {
  flickr.photos.search(req.query)
		.ok(res => res.status < 500)
		.then(response => {
    	res.json(response.body);
		})
		.catch(error => {
			console.log(error);
		});
});

module.exports = router;
