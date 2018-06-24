const express = require('express');
const router = express.Router();

const util = require('util');
const dateformat = require('dateformat');
const _ = require('underscore');

const db = require('../db');

const flickr = require('../flickr');

function view2ImgTag(view) {
	return `<img src="${view.source}" /><div>${JSON.stringify(view)}</div>`;
}

function views2Html(views) {
	return _.map(views, view => {
			return view2ImgTag(view);
		})
		.join('<br />');
}

router.get('/:name', async (req, res) => {
	let city = await db.City.findOne({ name: req.params.name })
		.exec();
	let params = _.defaults(req.query, {
		has_geo: '1',
		lat: city.lat,
		lon: city.lng,
		radius: 30,
		license: '4,7,9,10',
		sort: 'relevance',
		per_page: 10,
		format: 'json'
	});
	flickr.photos.search(params)
		.then(async searchRes => {
			let views = searchRes.body.photos.photo;
			for (view of views) {
				view.sizes = await flickr.photos.getSizes({
						photo_id: view.id
					})
					.then(sizesRes => {
						return sizesRes.body.sizes.size;
					});
				view.info = await flickr.photos.getInfo({
						photo_id: view.id,
						secret: view.secret
					})
					.then(infoRes => {
						return infoRes.body.photo;
					});
			}
			return views;
		})
		.then(views => {
			return _.filter(views, view => {
				let size = _.find(view.sizes, entry => {
					return Math.abs(entry.width - 1024) < 200;
				});
				if (size) {
					view.size = size;
					view.source = size.source;
				}
				return size;
			});
		})
		.then(views => {
			return _.sortBy(views, view => {
				return -view.info.views;
			});
		})
		// .then(views => {
		// 	return _.first(views, 5);
		// })
		.then(views => {
			return _.map(views, view => {
				return {
					license: view.info.license,
					title: view.title,
					taken: view.info.dates.taken,
					source: view.source,
					views: view.info.views,
					tags: _.map(view.info.tags.tag, tag => {
						return tag._content;
					})
				};
			});
		})
		.then(views => {
			res.send(views2Html(views));
		});
});

module.exports = router;