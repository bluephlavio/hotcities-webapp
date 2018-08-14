const config = require('./config');
const db = require('./db');
const app = require('./app');

const { port } = config;

db.open()
  .then(() => app.listen(port, () => console.log(`Server listening on port ${port}.`)))
  .catch(err => console.log(`Something went wrong: ${err}`));
