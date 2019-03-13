import http from 'http';
import mongoose from 'mongoose';
import config, { env } from '../config/config';

let app = require('./server').default;

const server = http.createServer(app);

mongoose.connect(config.db.uri)
  .then(() => console.log(`Connected to the database on port ${config.db.port}...`))
  .then(() => server.listen(config.server.port))
  .then(() => console.log(`Server is listening on port ${config.server.port}...`))
  .then(() => require('./models/all'))
  .catch(err => console.error(err));

if (env === 'development' && module.hot) {
  module.hot.accept('./server', () => {
    try {
      server.removeListener('request', app);
      app = require('./server').default;
      server.on('request', app);
    } catch (err) {
      console.error(err);
    }
  });
}
