require('dotenv')
  .config();

const express = require('express');
const router = express.Router();

const _ = require('underscore');
const geojson = require('geojson')

const db = require('../db');
db.open();


router.get('/cities', (req, res) => {
	let agg = db.City.aggregate()
		.lookup({
			from: 'records',
			localField: 'geonameid',
			foreignField: 'geonameid',
			as: 'records'
		})
		.addFields({
			maxTemp: { $max: '$records.temp'},
			records: { $size: '$records' }
		})
		.project({_id: 0})
		.sort(req.query.sort ? req.query.sort.replace(',', ' ') : 'name');
	if (req.query.filter == 'records-only') {
		agg = agg.match({records: {$gt: 0}});
	}
	if (req.query.limit) {
		let num = Number(req.query.limit);
		if (num > 0) {
			agg = agg.limit(num);
		}
	}
	agg.exec().then(data => {
			if (req.query.geojson == 'true') {
				data = geojson.parse(data, {Point: ['lat', 'lng']});
			}
			res.json(data);
		});
});

router.get('/cities/:id', (req, res) => {
	db.City.aggregate()
		.match({
			geonameid: Number(req.params.id)
		})
		.lookup({
			from: 'records',
			localField: 'geonameid',
			foreignField: 'geonameid',
			as: 'records'
		})
		.addFields({
			maxTemp: { $max: '$records.temp'},
			records: { $size: '$records' }
		})
		.project({_id: 0})
		.exec()
		.then(data => {
			data = data[0];
			if (req.query.geojson == 'true') {
				data = geojson.parse(data, {Point: ['lat', 'lng']});
			}
			res.json(data);
		})
});

router.get('/records', (req, res) => {
	agg = db.Record.aggregate()
		.lookup({
			from: 'cities',
			localField: 'geonameid',
			foreignField: 'geonameid',
			as: 'city'
		})
		.unwind('$city')
		.addFields({
			name: '$city.name',
			localname: '$city.localname',
			country: '$city.country',
			countrycode: '$city.countrycode',
			timezone: '$city.timezone',
			lang: '$city.lang',
			population: '$city.population',
			lng: '$city.lng',
			lat: '$city.lat'
		})
		.project({
			_id: 0,
			__v: 0,
			city: 0
		})
		.sort(req.query.sort ? req.query.sort.replace(',', ' ') : '-timestamp');
	if (req.query.limit) {
		let num = Number(req.query.limit);
		if (num > 0) {
			agg = agg.limit(num);
		}
	}
	agg.exec().then(data => {
			if (req.query.geojson == 'true') {
				data = geojson.parse(data, {Point: ['lat', 'lng']});
			}
			res.json(data);
		});
});

router.get('/records/current', (req, res) => {
	db.Record.aggregate()
		.sort('-timestamp')
		.limit(1)
		.lookup({
			from: 'cities',
			localField: 'geonameid',
			foreignField: 'geonameid',
			as: 'city'
		})
		.unwind('$city')
		.addFields({
			name: '$city.name',
			localname: '$city.localname',
			country: '$city.country',
			countrycode: '$city.countrycode',
			timezone: '$city.timezone',
			lang: '$city.lang',
			population: '$city.population',
			lng: '$city.lng',
			lat: '$city.lat'
		})
		.project({
			_id: 0,
			__v: 0,
			city: 0
		})
		.exec()
    .then(data => {
			data = data[0];
			if (req.query.geojson == 'true') {
				data = geojson.parse(data, {Point: ['lat', 'lng']});
			}
      res.json(data);
    });
});


module.exports = router;
