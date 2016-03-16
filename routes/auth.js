'use strict';
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var router = express.Router();

var auth = expressJwt({secret: process.env.JWT_SECRET});

router.get('/', auth , function(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    res.sendStatus(200);
  });

module.exports = router;
