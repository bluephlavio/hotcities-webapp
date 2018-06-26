const Flickr = require('flickr-sdk');
const _ = require('underscore');

const flickr = new Flickr(process.env.FLICKR_KEY);

function mergeViewData(photo, size, info) {
	return {
		id: photo.id,
		title: photo.title,
		src: size.source,
		taken: info.photo.dates.taken,
		views: Number(info.photo.views),
		tags: _.map(info.photo.tags.tag, tag => { return tag._content; }),
		licenseid: Number(info.photo.license),
		owner: {
			id: info.photo.owner.nsid,
			username: info.photo.owner.username,
			realname: info.photo.owner.realname
		}
	};
}

function getSearchParams(city) {
	return {
		has_geo: '1',
		lat: city.lat,
		lon: city.lng,
		radius: 30,
		license: '1,2,4,5,7,9,10',
		sort: 'relevance',
		per_page: 100,
		format: 'json'
	};
}

async function fetchViews(city, limit = 10) {
	let res;
	res = flickr.photos.search(getSearchParams(city));
	let candidates = res.body.photos.photo.slice(0, limit);
	let views = [];
	for (photo of candidates) {
		res = await flickr.photos.getSizes({
			photo_id: photo.id
		});
		let size = _.find(res.body.sizes.size, size => {
			return Math.abs(size.width - 1024) < 100;
		});
		if (size) {
			res = await flickr.photos.getInfo({
				photo_id: photo.id,
				secret: photo.secret
			});
			let info = res.body;
			let view = mergeViewData(photo, size, info);
			views.push(view);
		}
	}
	return views;
}

module.exports = {
	mergeViewData,
	getSearchParams,
	fetchViews
}