const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');

module.exports = withFonts(
  withImages(
    withCss({
      exportPathMap: () => ({
        '/': { page: '/' },
        '/stats': { page: '/stats' },
        '/about': { page: '/about' }
      })
    })
  )
);
