import express from 'express';
import apiCtrl from '../controllers/api';
import City from '../models/city';
import Record from '../models/record';
import View from '../models/view';

const router = express.Router();

router.get(
  '/cities',
  apiCtrl.buildCursorMiddleware(City),
  apiCtrl.filterMiddleware(
    'geonameid',
    'name',
    'population',
    'countrycode',
    'timezone',
    'lng',
    'lat',
  ),
  apiCtrl.sortMiddleware(),
  apiCtrl.paginationMiddleware(),
  apiCtrl.get(),
);

router.get(
  '/cities/:id',
  apiCtrl.buildCursorMiddleware(City),
  apiCtrl.matchMiddleware(),
  apiCtrl.get(),
);

router.get(
  '/records',
  apiCtrl.buildCursorMiddleware(Record),
  apiCtrl.filterMiddleware(
    'geonameid',
    'temp',
    'timestamp',
  ),
  apiCtrl.sortMiddleware(),
  apiCtrl.paginationMiddleware(),
  apiCtrl.get(),
);

router.get(
  '/records/current',
  apiCtrl.buildCursorMiddleware(Record),
  apiCtrl.sortMiddleware('-timestamp'),
  apiCtrl.paginationMiddleware(0, 1),
  apiCtrl.get(),
);

router.get(
  '/records/:id',
  apiCtrl.buildCursorMiddleware(Record),
  apiCtrl.matchMiddleware(),
  apiCtrl.get(),
);

router.get(
  '/views',
  apiCtrl.buildCursorMiddleware(View),
  apiCtrl.filterMiddleware(
    'geonameid',
  ),
  apiCtrl.sortMiddleware(),
  apiCtrl.paginationMiddleware(),
  apiCtrl.get(),
);

router.get(
  '/views/:id',
  apiCtrl.buildCursorMiddleware(View),
  apiCtrl.matchMiddleware(),
  apiCtrl.get(),
);

router.put(
  '/views/:id',
  apiCtrl.authenticationMiddleware(),
  apiCtrl.update(),
);

router.get(
  '/stats/cities',
  apiCtrl.readCitiesStats,
);

router.get(
  '/stats/countries',
  apiCtrl.readCountriesStats,
);

export default router;
