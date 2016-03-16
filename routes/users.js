'use strict';
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');

var router = express.Router();

/* GET users listing. */
// MIGHT NOT NEED THIS ROUTE
router.get('/', function(req, res, next) {

  var cert = process.env.JWT_SECRET;

  var jwtOptions = {
    expiresIn: "30 days",
  };

  var jwtPayload = {
    email: 'frozenaquanaut@hotmail.com',
    phone: 3038828701
  };

  var token = jwt.sign(jwtPayload, cert, jwtOptions);
  console.log(token);
  res.json(token);

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
      knex('users').insert(user).then(function(response) {
        res.send(response);
      });
    });
  });

});

router.post('/signin', function(req, res, next) {
  // user sends a post request with email and password
  // Get email and password
  var email = req.body.email;
  var plainPass = req.body.password;
  var hashPass = '';
  var hashStore = '';
  
  // Retrive stored password
  knex.select()
    .from('users')
    .where('email', email)
    .then(function(row) {

      // Use bcrypt to compare the passwords
      hashStore = row[0].password;

      bcrypt.compare(plainPass, hashStore, function(err, isAuth) {
        if (err) {
          console.log('Auth Encrypt Error: ' + err);
          res.send(err);
        }

        // If they are equal create json web token
        if (isAuth) {

          var cert = process.env.JWT_SECRET;

          var jwtOptions = {
            expiresIn: "30 days",
          };

          var jwtPayload = {
            email: row[0].email,
            phone: row[0].phone
          };

          var token = jwt.sign(jwtPayload, cert, jwtOptions);
          res.json(token);

        } else {
          // else alert them to the error
          res.send('Incorrect username password combo');
        }
      });

    });
});

/*******************
 User by ID
 *******************/
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.send(req.user);
});

router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
