const config = {
  env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  jwtSecret: 'secret',
  server: {
    protocol: 'http',
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000,
  },
  db: {
    protocol: 'mongodb',
    host: process.env.MONGO_HOST || 'localhost',
    user: process.env.MONGO_USER || 'admin',
    port: process.env.MONGO_PORT || 27017,
    name: process.env.MONGO_DB_NAME || 'hotcities',
  },
  devServer: {
    port: 8080,
  },
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  flickr: {
    consumer_key: process.env.FLICKR_CONSUMER_KEY,
    consumer_secret: process.env.FLICKR_CONSUMER_SECRET,
    access_token: process.FLICKR_OAUTH_TOKEN,
    access_token_secret: process.FLICKR_OAUTH_TOKEN_SECRET,
  },
  openweathermap: {
    consumer_key: process.env.OPENWEATHERMAP_KEY,
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYmx1ZXBobGF2aW8iLCJhIjoiY2ppMGFlNGhnMDAzcTNwcGpxbXA1dHAxdiJ9.wxN7uepuQStutK1vvxFzBg',
    mapstyle: 'mapbox://styles/bluephlavio/cjin553wo0vr92rrynvsksfuv',
  },
};

const { server, db } = config;

server.url = `${server.protocol}://${server.host}:${server.port}`;
db.uri = `${db.protocol}://${db.host}:${db.port}/${db.name}`;

module.exports = config;
