import 'babel-polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressHandlebars from 'express-handlebars';
import { env } from '../config/config';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const buildRouter = () => {
  const router = express.Router();
  router.use('/auth', require('./routes/auth').default);
  router.use('/api', require('./routes/api').default);
  router.use(express.static(path.join(DIST_DIR, 'client')));
  router.use(require('./routes/main').default);
  return router;
};

const app = express();

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

if (env === 'development') {
  require('source-map-support').install();
  app.use(require('morgan')('dev'));

  const webpack = require('webpack');
  const webpackConfigClient = require('../webpack.config.client');
  const compiler = webpack(webpackConfigClient);
  app.use(require('webpack-dev-middleware')(compiler));
  app.use(require('webpack-hot-middleware')(compiler));

  app.use(bodyParser.json());
  app.use(cookieParser());

  const dynamicMiddleware = require('express-dynamic-middleware');
  const dynamicRouter = dynamicMiddleware.create(buildRouter());
  app.use(dynamicRouter.handle());

  if (module.hot) {
    module.hot.accept([
      './routes/auth',
      './routes/api',
      './routes/main',
    ], () => {
      try {
        dynamicRouter.clean();
        dynamicRouter.use(buildRouter());
      } catch (err) {
        console.error(err);
      }
    });
  }
} else {
  app.use(bodyParser.json());
  app.use(buildRouter());
}

export default app;
