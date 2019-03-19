import * as functions from 'firebase-functions';
import * as next from 'next';
import * as path from 'path';

console.log(`${path.relative(process.cwd(), __dirname)}/next`);

const dev = false; //process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: __dirname,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});
const handle = app.getRequestHandler();

export const render = functions.https.onRequest((req, res) => {
  return handle(req, res);
});
