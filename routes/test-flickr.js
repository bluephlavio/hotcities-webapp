const express = require('express');
const router = express.Router();

const util = require('util');
const dateformat = require('dateformat');
const _ = require('underscore');

const db = require('../db');

const flickr = require('../flickr');

function view2ImgTag(view) {
	return `<div><img src="${view.src}" /><span>${JSON.stringify(view)}</span></div>`;
}

function views2Html(views) {
	return _.map(views, view => {
			return view2ImgTag(view);
		})
		.join('');
}

router.get('/:name', async (req, res) => {
	let city = await db.City.findOne({ name: req.params.name });
	let views = await flickr.fetchViews(city, req.query);
	return res.send(views2Html(views));
});

module.exports = router;