const express = require('express');
const _ = require('underscore');

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

const mongoose = require('mongoose');
const db = require('../db');

const router = express.Router();


router.get('/', (req, res) => {
  db.fetchCurrent(data => {
    res.render('index', data);
  });
});

router.get('/openweathermap', (req, res) => {
  openweathermap.query(weather => {
    res.json(weather);
  })
});

router.get('/flickr', (req, res) => {
  flickr.query({
    name: req.query.name,
  }, photos => {
    if (req.query.display) {
      res.setHeader('Content-Type', 'text/html');
      res.end(_.map(photos, photo => {
        return `<img src="${photo}" />`;
      }).join('\n'));
    } else {
      res.json(photos);
    }
  });
});


module.exports = router;
