const path = require('path');

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/about': { page: '/about' },
  }),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'theme')],
    prependData: [`@import "_variables.scss";`, `@import "_mixins.scss";`].join('\n'),
  },
};
