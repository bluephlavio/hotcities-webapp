const express = require('express');
const path = require('path');
const router = express.Router();

const db = require('../db');
const geoname = require('../geoname');
const openweathermap = require('../openweathermap');
const flickr = require('../flickr');

router.get('/login', (req, res) => {
	if (req.session.admin) {
		res.redirect('/admin');
	} else {
		res.render('login', {});
	}
});

router.post('/login', (req, res) => {
	if (req.body.password == process.env.ADMIN_PWD) {
		req.session.admin = true
		res.redirect('/admin');
	} else {
		res.redirect('/admin/login');
	}
});

router.use('/', (req, res, next) => {
	if (req.session.admin) {
		next();
	} else {
		res.redirect('/admin/login');
	}
});

router.get('/views/fetch', async (req, res) => {
	let city = await geoname.findCityByName(req.query.city);
	console.log(city);
	let views = await flickr.fetchViewsAndSave(city, {});
	res.redirect('/admin/views');
});

router.use('/', express.static(path.join(__dirname, '..', 'admin', 'build')));
router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'admin', 'build', 'index.html'));
});

module.exports = router;