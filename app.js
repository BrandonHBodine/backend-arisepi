'use strict';
require('dotenv').load({
  silent: true
});
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knex;
var expressJwt = require('express-jwt');


// Current route files
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

// Intialize app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// App Settings
app.use(cors());
app.use(function(req, res, next) {
  knex = require('./db/knex');
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Exceptions for protected routes
// Only route in path array will be allowed with out JWT
app.use(expressJwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/',
    '/users/signup',
    '/users/signin'
  ]
}));

// Current routes
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
