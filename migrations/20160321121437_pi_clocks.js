'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('piclocks', function(table){
    table.increments('id');
    table.string('name');
    table.string('user_id');
    table.string('ip');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('piclocks');
};
