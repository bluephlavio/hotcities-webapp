const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    cssModules: true,
    exportPathMap: () => ({
      '/': { page: '/' },
      '/stats': { page: '/stats' },
      '/about': { page: '/about' }
    })
  })
);
