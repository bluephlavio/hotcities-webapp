const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = {
  plugins: [
    autoprefixer,
    cssnano,
  ],
  sourceMap: true,
};

module.exports = config;
