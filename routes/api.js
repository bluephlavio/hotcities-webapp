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

router.get('/cities/:geonameid', (req, res) => {
	db.City.aggregate()
		.match({
			geonameid: Number(req.params.geonameid)
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
		.project({
			_id: 0,
			__v: 0
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
		.project({
			_id: 0,
			__v: 0,
		})
		.exec()
		.then(data => {
			res.json(data[0]);
		});
});

router.get('/records/:geonameid', (req, res) => {
	db.Record.aggregate()
		.match({
			geonameid: Number(req.params.geonameid)
		})
		.project({
			_id: 0,
			__v: 0
		})
		.exec()
		.then(data => {
			res.json(data);
		});
});
router.get('/views', (req, res) => {
	db.View.find()
		.populate({
			path: 'license',
			select: '-_id'
		})
		.select('-_id -__v')
		.exec()
		.then(data => {
			res.json(data);
		});
});

router.get('/views/:geonameid', (req, res) => {
	db.View.find({ geonameid: req.params.geonameid })
		.populate({
			path: 'license',
			select: '-_id'
		})
		.select('-_id -__v')
		.exec()
		.then(data => {
			return _.sortBy(data, entry => {
				return -entry.relevance;
			})
		})
		.then(data => {
			res.json(data);
		});
});

router.get('/stats/cities', (req, res) => {
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

router.get('/stats/countries', (req, res) => {
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

router.put('/views/:id', async (req, res) => {
	if (req.isAuthenticated()) {
		let view = await db.View.findOneAndUpdate({
			id: req.params.id
		}, req.body);
		console.log(view);
		res.json(view);
	} else {
		res.redirect('/admin/login');
	}
});


module.exports = router;