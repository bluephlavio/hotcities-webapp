import _ from 'underscore';
import mongoose from 'mongoose';
import apiHelpers from '../helpers/api';
import Record from '../models/record';

const buildCursorMiddleware = model => (req, res, next) => {
  res.cursor = model.aggregate()
    .project({
      __v: 0,
    });
  next();
};

const matchMiddleware = () => (req, res, next) => {
  const { cursor } = res;
  cursor.match({ _id: mongoose.Types.ObjectId(req.params.id) });
  next();
};

const filterMiddleware = (...keys) => (req, res, next) => {
  const { cursor } = res;
  keys.forEach((key) => {
    const v = req.query[key];
    if (v) {
      const values = apiHelpers.parseQueryParamValue(v);
      values.forEach((value) => {
        if (_.isArray(value)) {
          switch (value[0]) {
            case '>':
              cursor.match({ [key]: { $gt: value[1] } });
              break;
            case '<':
              cursor.match({ [key]: { $lt: value[1] } });
              break;
            default:
              break;
          }
        } else {
          cursor.match({ [key]: value });
        }
      });
    }
  });
  next();
};

const sortMiddleware = (...keys) => (req, res, next) => {
  const key = keys.length
    ? keys[0]
    : apiHelpers.parseQueryParamValue(req.query.sort)[0];
  const { cursor } = res;
  if (key) {
    cursor.sort(key);
  }
  next();
};

const paginationMiddleware = (...keys) => (req, res, next) => {
  const { cursor } = res;
  const skip = keys.length
    ? keys[0]
    : (parseInt(req.query.skip, 10) || 0);
  if (skip) {
    cursor.skip(skip);
  }
  const limit = keys.length > 1
    ? keys[1]
    : (parseInt(req.query.limit, 10) || 0);
  if (limit) {
    cursor.limit(limit);
  }
  next();
};

const authenticationMiddleware = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('admin/login');
  }
};

const get = () => (req, res) => {
  const { cursor } = res;
  return cursor
    .exec()
    .then(data => res.json(data));
};

const update = model => async (req, res) => {
  const { id } = req.params;
  const obj = await model.findByIdAndUpdate(id, req.body);
  return res.json(obj);
};

// const readCities = (req, res) => {
//   const {
//     name,
//     country,
//     population,
//     sort,
//   } = req.query;
//   const skip = parseInt(req.query.skip, 10) || 0;
//   const limit = parseInt(req.query.limit, 10) || 0;
//   const result = City.aggregate()
//     .project({
//       _id: 0,
//       __v: 0,
//     });
//   if (name) {
//     result.match({ name });
//   }
//   if (country) {
//     result.match({ country });
//   }
//   apiHelpers.matchQueryStringValue(result, 'population', population);
//   if (sort) {
//     result.sort(sort);
//   }
//   result.skip(skip);
//   if (limit) {
//     result.limit(limit);
//   }
//   return result.exec()
//     .then((data) => {
//       res.json(data);
//     });
// };
//
// const readCity = (req, res) => {
//   const { geonameid } = req.params;
//   City.aggregate()
//     .match({
//       geonameid: Number(geonameid),
//     })
//     .project({
//       _id: 0,
//       __v: 0,
//     })
//     .exec()
//     .then((data) => {
//       res.json(data[0]);
//     });
// };
//
// const readRecords = (req, res) => {
//   const result = Record.aggregate()
//     .project({
//       _id: 0,
//       __v: 0,
//     });
//   const { geonameid } = req.query;
//   if (geonameid) {
//     result.match({ geonameid });
//   }
//   const { temp } = req.query;
//   if (temp) {
//     _.forEach(temp.split(','), (t) => {
//       const match = t.split('::');
//       if (match.length > 1) {
//         const operator = match[0];
//         const value = parseInt(match[1], 10);
//         if (operator === 'gt') {
//           result.match({ temp: { $gt: value } });
//         } else if (operator === 'lt') {
//           result.match({ temp: { $lt: value } });
//         }
//       } else {
//         const value = parseInt(match[0], 10);
//         result.match({ temp: value });
//       }
//     });
//   }
//   const { timestamp } = req.query;
//   if (timestamp) {
//     _.forEach(timestamp.split(','), (t) => {
//       const match = t.split('::');
//       if (match.length > 1) {
//         const operator = match[0];
//         const value = new Date(match[1]);
//         if (operator === 'gt') {
//           result.match({ timestamp: { $gt: value } });
//         } else if (operator === 'lt') {
//           result.match({ timestamp: { $lt: value } });
//         }
//       } else {
//         const value = new Date(match[0]);
//         result.match({ timestamp: value });
//       }
//     });
//   }
//   const { sort } = req.query;
//   if (sort) {
//     result.sort(sort);
//   }
//   const skip = parseInt(req.query.skip, 10) || 0;
//   result.skip(skip);
//   const limit = parseInt(req.query.limit, 10) || 0;
//   if (limit) {
//     result.limit(limit);
//   }
//   return result.exec()
//     .then((data) => {
//       res.json(data);
//     });
// };
//
// const readCurrentRecord = (req, res) => {
//   Record.aggregate()
//     .sort('-timestamp')
//     .limit(1)
//     .project({
//       _id: 0,
//       __v: 0,
//     })
//     .exec()
//     .then((data) => {
//       res.json(data[0]);
//     });
// };
//
// const readRecordsByGeonameId = (req, res) => {
//   Record.aggregate()
//     .match({
//       geonameid: Number(req.params.geonameid),
//     })
//     .project({
//       _id: 0,
//       __v: 0,
//     })
//     .exec()
//     .then((data) => {
//       res.json(data);
//     });
// };
//
// const readViews = (req, res) => {
//   View.find()
//     .populate({
//       path: 'license',
//       select: '-_id',
//     })
//     .select('-_id -__v')
//     .exec()
//     .then((data) => {
//       res.json(data);
//     });
// };
//
// const readViewsByGeonameId = (req, res) => {
//   View.find({ geonameid: req.params.geonameid })
//     .populate({
//       path: 'license',
//       select: '-_id',
//     })
//     .select('-_id -__v')
//     .exec()
//     .then(data => _.sortBy(data, entry => -entry.relevance))
//     .then((data) => {
//       res.json(data);
//     });
// };
//
const readCitiesStats = (req, res) => {
  Record.count()
    .then(count => Record.aggregate()
      .group({
        _id: '$geonameid',
        recordFrac: { $sum: 1 / count },
        recordTemp: { $max: '$temp' },
      })
      .lookup({
        from: 'cities',
        localField: '_id',
        foreignField: 'geonameid',
        as: 'city',
      })
      .unwind('$city')
      .addFields({
        'city.recordFrac': '$recordFrac',
        'city.recordTemp': '$recordTemp',
      })
      .replaceRoot('$city')
      .project({
        _id: 0,
      })
      .exec())
    .then((data) => {
      const fracs = _.map(data, item => item.recordFrac);
      const temps = _.map(data, item => item.recordTemp);
      const maxFrac = _.max(fracs);
      const maxTemp = _.max(temps);
      res.json(_.map(data, (item) => {
        const {
          recordFrac,
          recordTemp,
        } = item;
        const a = recordFrac / maxFrac;
        const b = recordTemp / maxTemp;
        const newItem = item;
        newItem.score = a * b;
        return newItem;
      }));
    });
};

const readCountriesStats = (req, res) => {
  Record.count()
    .then(count => Record.aggregate()
      .lookup({
        from: 'cities',
        localField: 'geonameid',
        foreignField: 'geonameid',
        as: 'city',
      })
      .unwind('$city')
      .group({
        _id: '$city.country',
        recordFrac: { $sum: 1 / count },
        recordTemp: { $max: '$temp' },
        recordCities: {
          $addToSet: '$city.geonameid',
        },
      })
      .addFields({
        country: '$_id',
        countrycode: '$city.countrycode',
      })
      .project({
        _id: 0,
      })
      .exec())
    .then((data) => {
      res.json(data);
    });
};

export default {
  buildCursorMiddleware,
  matchMiddleware,
  filterMiddleware,
  sortMiddleware,
  paginationMiddleware,
  authenticationMiddleware,
  get,
  update,
  // readCities,
  // readCity,
  // readRecords,
  // readCurrentRecord,
  // readRecordsByGeonameId,
  // readViews,
  // readViewsByGeonameId,
  readCitiesStats,
  readCountriesStats,
};
