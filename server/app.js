const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const devBundle = require('./devBundle');

const app = express();

devBundle.compile(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, '..', 'assets', 'favicon.ico'), { maxAge: 0 }));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));

module.exports = app;
