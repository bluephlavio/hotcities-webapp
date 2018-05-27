const express = require('express');
const router = express.Router();

const _ = require('underscore');

const db = require('../db');

router.get('/cities/', (req, res) => {
  let criteria = req.query.all ? {} : { records: { $not: { $size: 0 } } };
  db.City.find(criteria)
    .populate('records')
    .then(cities => {
      let data = _.map(cities, city => {
        return city.toObject();
      });
      if (req.query.stats) {
        data = _.map(data, city => {
          let recordsCount = city.records.length;
          let recordTemp = recordsCount ? _.max(_.map(city.records, record => {
            return record.temp;
          })) : null;
          city.stats = {
            recordsCount,
            recordTemp
          }
          return city;
        });
      }
      if (!req.query.records) {
        data = _.map(data, city => {
          return _.omit(city, 'records');
        });
      }
      res.json(data);
    });
});

router.get('/cities/:name', (req, res) => {
  db.City.findOne({
      name: req.params.name
    })
    .populate('records')
    .exec((error, city) => {
      res.json(city);
    });
});

router.get('/records/', (req, res) => {
  db.Record.find({})
    .sort({
      timestamp: -1
    })
    .populate('city')
    .exec((error, records) => {
      res.json(records);
    });
});

router.get('/records/current', (req, res) => {
  db.Record.findOne({})
    .sort({
      timestamp: -1
    })
    .populate('city')
    .exec((error, current) => {
      res.json(current);
    });
});

module.exports = router;