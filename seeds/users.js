exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      fname: 'Brandon',
      lname: 'Bodine',
      username: 'Mundizzle',
      password: 'password',
      phone: '3038828701',
      email: 'brandonhbodine@gmail.com',
      access: 'admin',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    }),
    knex('users').insert({
      fname: 'Keenan',
      lname: 'Hoff',
      username: 'Kyloren',
      password: 'password',
      phone: '3038828701',
      email: 'keenan@gmail.com',
      access: 'admin',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    })
  );
};
