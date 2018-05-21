const express = require('express');
const _ = require('underscore');

const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

const mongoose = require('mongoose');
const db = require('../db');

const router = express.Router();


router.get('/api/cities/', (req, res) => {
  db.City.find({}, (error, cities) => {
    res.json(cities);
  });
});

router.get('/api/cities/:name', (req, res) => {
  db.City.findOne({ name: req.params.name }).exec( (error, city) => {
    res.json(city);
  });
});

router.get('/api/records/', (req, res) => {
  db.Record.find({}).sort({ timestamp: -1 }).exec( (error, records) => {
    res.json(records);
  });
});

router.get('/api/records/current', (req, res) => {
  db.Record.findOne({}).sort({ timestamp: -1 }).exec( (error, current) => {
    res.json(current);
  });
});

router.get('/', (req, res) => {
  db.fetchCurrent(data => {
    if (data) {
      res.render('index', data);
    } else {
      res.end('No record found!');
    }
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
