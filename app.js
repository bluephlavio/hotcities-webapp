require('dotenv')
	.config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.png'), { maxAge: 0 }));
app.use(logger('dev'));

app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));
app.use('/test-flickr', require('./routes/test-flickr'));

// app.use('/', express.static(path.join(__dirname, 'client', 'build'), { maxAge: 0 }));
// app.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });


module.exports = app;