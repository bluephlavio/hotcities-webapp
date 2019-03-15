const functions = require('firebase-functions');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  conf: {
    distDir: '../dist',
  },
});
const handle = app.getRequestHandler();

exports.app = functions.https.onRequest((req, res) => {
  app.prepare().then(() => handle(req, res));
});
