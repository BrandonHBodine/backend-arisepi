'use strict';
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');

var router = express.Router();

var jwtCheck = expressJwt({
  secret: process.env.SECRET
});

/* GET users listing. */
// MIGHT NOT NEED THIS ROUTE
router.get('/', function(req, res, next) {

// Testing stuff REMOVE
  var str = "password";
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(str, salt, function(err, hash) {
      console.log(hash);
    });
  });

  bcrypt.compare('password', '$2a$10$KkOrEzX9SPUBR/m4gxH07u9nnv8cKIfr69yK8HlQPl1GPNb3cJ0Ty', function(err, res) {
    console.log(res);
  });

  knex.select().table('users').then(function(rows) {
    res.send(rows);
  });

});

/*******************
 Sign up
 *******************/
// MIGHT NOT NEED THIS ROUTE
router.get('/signup', function(req, res, next) {
  res.send('respond with a resource');
});

// Create USER
router.post('/signup', function(req, res, next) {

  var user = {};
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.password = req.body.password;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.access = 'user';
  user.created_at = new Date().toUTCString();
  user.updated_at = new Date().toUTCString();
  var password = req.body.password;

  // Hash password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      user.password = hash;
      // Creat databse record
      knex('users').insert(user).then(function(response){
        res.send(response);
      });
    });
  });

});

/*******************
 User by ID
 *******************/
router.get('/:id', function(req, res, next) {

  res.send('respond with a resource');

});

router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
