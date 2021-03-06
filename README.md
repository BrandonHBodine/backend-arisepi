
# Arise Pi Backend

### Trello Board for Project
[Trello Link](https://trello.com/b/7BCedz4N)

### Creating your database
 1. createdb arise_pi
 2. Run `SET TIME ZONE 'UTC'` within psql;
 3. add .env file with 'DEV_DB=postgres://localhost/arise_pi'
 4. knex migrate:latest
 5. knex seed:run

### Deploying to Heroku
 1. heroku login


### Create the Database
 1. heroku addons | grep POSTGRES
 2. heroku addons:create heroku-postgresql:hobby-dev

### Migrate and Seed the Database
 1. heroku config
 2. Copy the DATABASE_URL
 3. Paste the DATABASE_URL into the .env after DATABASE_URL
 4. knex migrate:rollback --env production
 5. knex migrate:latest --env production
 6. knex seed:run --env production
