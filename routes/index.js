const express = require('express');
const router = express.Router();

const db = require('../db');


router.get('/api/cities/', (req, res) => {
  db.City.find({}).exec( (error, cities) => {
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


module.exports = router;
