import * as functions from 'firebase-functions';
import * as next from 'next';
import * as path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  conf: { distDir: `${path.join(path.relative(process.cwd(), __dirname), '..', 'next')}` }
});
const handle = app.getRequestHandler();

export const render = functions.https.onRequest((req, res) => {
  return handle(req, res);
});
