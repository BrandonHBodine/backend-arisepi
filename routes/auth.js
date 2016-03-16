'use strict';
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var router = express.Router();

var auth = expressJwt({
  secret: process.env.SECRET
});

// authenticate: function(submission) {
//   return new Promise(function(resolve, reject) {
//     knex('users')
//       .select('*')
//       .where('username', submission.username)
//       .then(function(userInfo) {
//         var user = userInfo[0];
//         var password = user.password;
//         delete user.password;
//         bcrypt.compare(submission.password, password, function(error, same) {
//           if (error) {
//             reject(error);
//           }
//           if (same) {
//             resolve(user);
//           } else {
//             resolve(false);
//           }
//         });
//       }).catch(function(error) {
//         reject(error);
//       });
//   });
// }

router.post('/', function(req, res) {
  accounts.authenticate(req.body).then(function(user) {
    if (user) {
      var token = jwt.sign(user, process.env.SECRET, {
        expiresIn: 60 * 60
      });
      res.json({
        token: token,
      });
    } else {
      res.json('invalid');
    }
  }).catch(function(error) {
    res.json(error);
  });
});

module.exports = router;
