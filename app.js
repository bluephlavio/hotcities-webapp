require('dotenv')
	.config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport-config');
const db = require('./db');

db.open();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(session({ secret: 'ahvaz', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico'), { maxAge: 0 }));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));

module.exports = app;