'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('username');
    table.string('password');
    table.string('phone');
    table.string('email');
    table.string('access');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
