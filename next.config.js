const withCss = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(
  withCss({
    exportPathMap: () => ({
      '/': { page: '/' },
      '/stats': { page: '/stats' },
      '/about': { page: '/about' }
    })
  })
);
