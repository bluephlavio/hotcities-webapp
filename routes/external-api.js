const express = require('express');
const router = express.Router();

const _ = require('underscore');

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

router.get('/openweathermap', (req, res) => {
  openweathermap.query(data => {
    res.json(data);
  });
});

router.get('/flickr', (req, res) => {
  let params = req.query ? req.query : {};
  flickr.query(params, data => {
    res.json(data);
  });
});

module.exports = router;