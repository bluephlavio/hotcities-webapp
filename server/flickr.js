import Flickr from 'flickr-sdk';
import _ from 'underscore';
import View from './models/view';
import config from '../config/config';

const flickr = new Flickr(Flickr.OAuth.createPlugin(
  config.flickr.consumer_key,
  config.flickr.consumer_secret,
  config.flickr.access_token,
  config.flickr.access_token_secret,
));

function mergeViewData(photo, size, info) {
  return {
    id: photo.id,
    title: photo.title,
    src: size.source,
    taken: info.photo.dates.taken,
    views: Number(info.photo.views),
    tags: _.map(info.photo.tags.tag, tag => tag._content),
    licenseid: Number(info.photo.license),
    isfavorite: Number(info.photo.isfavorite),
    owner: {
      id: info.photo.owner.nsid,
      username: info.photo.owner.username,
      realname: info.photo.owner.realname,
    },
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
    per_page: 100,
    format: 'json',
  };
}

async function fetchViews(city, params, limit = 10) {
  let res;
  res = await flickr.photos.search(_.defaults(params, getSearchParams(city)));
  const photos = res.body.photos.photo;
  const candidates = photos.slice(0, limit);
  const views = [];
  for (const photo of candidates) {
    res = await flickr.photos.getSizes({
      photo_id: photo.id,
    });
    const size = _.find(res.body.sizes.size, size => Math.abs(size.width - 1024) < 100);
    if (size) {
      res = await flickr.photos.getInfo({
        photo_id: photo.id,
        secret: photo.secret,
      });
      const info = res.body;
      const view = mergeViewData(photo, size, info);
      view.geonameid = city.geonameid;
      views.push(view);
    }
  }
  return views;
}

async function fetchViewsAndSave(city, params, limit = 10) {
  let views;
  try {
    const flickrViews = await fetchViews(city, params, limit = limit);
    views = [];
    const now = Date.now();
    for (const [i, flickrView] of flickrViews.entries()) {
      flickrView.timestamp = now;
      flickrView.rank = i;
      const view = await View.findOneAndUpdate({
        id: flickrView.id,
      }, flickrView, {
        upsert: true,
        setDefaultsOnInsert: true,
      });
      views.push(view);
    }
  } catch (error) {
    console.log(error);
  } finally {
    return views;
  }
}

export default {
  mergeViewData,
  getSearchParams,
  fetchViews,
  fetchViewsAndSave,
};
