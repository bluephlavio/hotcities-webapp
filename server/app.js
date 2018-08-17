const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
// const React = require('react');
// const { renderToString } = require('react-dom/server');
// const { StaticRouter } = require('react-router-dom');
// const App = require('../client/src/App');
const devBundle = require('./devBundle');

const app = express();

devBundle.compile(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, '..', 'assets', 'favicon.ico'), { maxAge: 0 }));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, '..', 'dist', 'client')));

module.exports = app;
