const path = require('path');

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/stats': { page: '/stats' },
    '/about': { page: '/about' }
  }),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'theme')],
    prependData: `@import "_variables.scss";`
  }
};
