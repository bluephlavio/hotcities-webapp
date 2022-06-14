import GeoJSON from 'geojson';
import _ from 'lodash';

export const geojsonify = (data) => GeoJSON.parse(
  data.map((entry) => {
    const { recordfrac, recordtemp } = entry;
    return {
      ...entry,
      radius: Math.sqrt(recordfrac),
      opacity: recordtemp,
    };
  }),
  { Point: ['lat', 'lng'] },
);

export const getLayer = (data) => ({
  id: 'records',
  type: 'circle',
  source: {
    type: 'geojson',
    data: geojsonify(data),
  },
  paint: {
    'circle-color': 'rgb(244, 147, 29)',
    'circle-blur': 0.3,
    'circle-opacity': [
      'interpolate',
      ['linear'],
      ['get', 'opacity'],
      _.chain(data)
        .map((entry) => entry.recordtemp)
        .min()
        .value(),
      0,
      _.chain(data)
        .map((entry) => entry.recordtemp)
        .max()
        .value(),
      1,
    ],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'radius'],
      _.chain(data)
        .map((entry) => entry.recordfrac)
        .min()
        .value(),
      0,
      _.chain(data)
        .map((entry) => entry.recordfrac)
        .max()
        .value(),
      12,
    ],
  },
});
