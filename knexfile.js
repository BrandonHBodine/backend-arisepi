// Update with your config settings.

require('dotenv').load({
  silent: true
});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
