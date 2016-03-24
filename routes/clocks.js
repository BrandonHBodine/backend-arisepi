'use strict';
var express = require('express');
var knex = require('../db/knex');

var router = express.Router();

/* Show all clocks for the user */
router.get('/', function(req, res, next) {
  var user_id = req.user.user;
  knex.select()
    .from('piclocks')
    .where('user_id', user_id)
    .then(function(data){
      res.json(data);
    });
});

// Add a clock
router.post('/add', function(req, res, next) {
  //Get user id from JWT
  var user_id = req.user.user;

  var piclock = {};
  piclock.name = req.body.name;
  piclock.ip = req.body.ip;
  piclock.user_id = user_id;
  piclock.created_at = new Date().toUTCString();
  piclock.updated_at = new Date().toUTCString();

  // Create databse record
  knex('piclocks')
  .insert(piclock)
  .then(function(response) {
    res.send(response);
  });

});


router.get('/:id', function(req, res, next) {
  //Get user id from JWT
  var user_id = req.user.user;
  var clock_id = req.params.id;
  knex.select()
    .from('piclocks')
    .where( {'user_id': user_id, 'id': clock_id} )
    .then(function(data){
      res.json(data);
    });
});

router.put('/id', function(req, res, next) {

});

router.delete('/:id', function(req, res, next) {

});

module.exports = router;
