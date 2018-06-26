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
		tags: `${city.name.toLowerCase().replace(/\s/g, '')},${city.country.toLowerCase().replace(/\s/g, '')},panorama,skyline,architecture,building,skyscraper,art,mosque,masjid,church,temple,street,park,bridge,metro,station,square,-meetings,-conferences`,
		license: '1,2,4,5,7,9,10',
		sort: 'relevance',
		per_page: 10,
		format: 'json'
	};
}

async function fetchViews(city, params, limit = 10) {
	let res;
	res = await flickr.photos.search(_.defaults(params, getSearchParams(city)));
	let photos = res.body.photos.photo;
	let candidates = photos.slice(0, limit);
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
			view.geonameid = city.geonameid;
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