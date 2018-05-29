const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const db = require('./db');
const datafetcher = require('./datafetcher');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'), { maxAge: 0 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build/')));
app.use('/api', require('./routes/api'));
app.use('/external-api', require('./routes/external-api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const period = 5000;

db.open()
  .then(() => {
    datafetcher.start(period);
  }).
  catch(error => {
    console.log(error);
  });

module.exports = app;
