exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('piclocks').del(),

    // Inserts seed entries
    knex('piclocks').insert({
      name: 'clock1',
      user_id: '1',
      ip: '10.0.0.17',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    }),
    knex('piclocks').insert({
      name: 'clock2',
      user_id: '1',
      ip: '10.0.0.15',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    }),
    knex('piclocks').insert({
      name: 'clock3',
      user_id: '1',
      ip: '10.0.0.18',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    })
  );
};
