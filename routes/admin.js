const express = require('express');
const path = require('path');

const router = express.Router();

const geoname = require('../geoname');
const flickr = require('../flickr');

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/auth/login');
	}
});

router.get('/views/fetch', async (req, res) => {
	let city = await geoname.findCityByName(req.query.city);
	console.log(city);
	let limit = req.query.limit ? Number(req.query.limit) : 25;
	let views = await flickr.fetchViewsAndSave(city, {}, limit = limit);
	console.log(`${views.length} views found.`);
	res.redirect(`/admin/views?${city.name}`);
});

router.use(express.static(path.join(__dirname, '..', 'admin', 'build')));

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'admin', 'build', 'index.html'));
});

module.exports = router;