require('dotenv')
	.config();

const express = require('express');
const router = express.Router();

const _ = require('underscore');

const db = require('../db');
db.open();


router.get('/cities', (req, res) => {
	db.City.aggregate()
		.project({
			_id: 0,
			__v: 0
		})
		.exec()
		.then(data => {
			res.json(data);
		});
});

router.get('/cities/:id', (req, res) => {
	db.City.aggregate()
		.match({
			geonameid: Number(req.params.id)
		})
		.project({
			_id: 0,
			__v: 0
		})
		.exec()
		.then(data => {
			res.json(data[0]);
		})
});

router.get('/records', (req, res) => {
	db.Record.aggregate()
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
			res.json(data[0]);
		});
});

router.get('/records/cities', (req, res) => {
	db.Record.count()
		.then(count => {
			return db.Record.aggregate()
				.group({
					_id: '$geonameid',
					recordFrac: { $sum: 1 / count },
					recordTemp: { $max: '$temp' }
				})
				.lookup({
					from: 'cities',
					localField: '_id',
					foreignField: 'geonameid',
					as: 'city'
				})
				.unwind('$city')
				.addFields({
					'city.recordFrac': '$recordFrac',
					'city.recordTemp': '$recordTemp'
				})
				.replaceRoot('$city')
				.project({
					_id: 0
				})
				.exec();
		})
		.then(data => {
			res.json(data);
		});
});

router.get('/records/countries', (req, res) => {
	db.Record.count()
		.then(count => {
			return db.Record.aggregate()
				.lookup({
					from: 'cities',
					localField: 'geonameid',
					foreignField: 'geonameid',
					as: 'city'
				})
				.unwind('$city')
				.group({
					_id: '$city.country',
					recordFrac: { $sum: 1 / count },
					recordTemp: { $max: '$temp' },
					recordCities: {
						$addToSet: '$city.geonameid'
					}
				})
				.addFields({
					country: '$_id',
					countrycode: '$city.countrycode'
				})
				.project({
					_id: 0,
				})
				.exec();
		})
		.then(data => {
			res.json(data);
		});
});


module.exports = router;