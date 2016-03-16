exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      fname: 'Brandon',
      lname: 'Bodine',
      username: 'Mundizzle',
      password: '$2a$10$xLsU.a2T3I/xvUFw1ySExOa2TiVnnsAOtomgubIi4xLl5RLlm0nC2',
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
      password: '$2a$10$xLsU.a2T3I/xvUFw1ySExOa2TiVnnsAOtomgubIi4xLl5RLlm0nC2',
      phone: '3038828701',
      email: 'keenan@gmail.com',
      access: 'admin',
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    })
  );
};
