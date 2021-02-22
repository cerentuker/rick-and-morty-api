// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

knex.schema
  .hasTable('Users')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('Users', (table) => {
          table.string('userName').primary().notNullable()
        })
        .then(() => {
          console.log('Table \'Users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating the Users table: ${error}`)
        })
    }
  })
  .then(() => {
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

knex.schema
  .hasTable('Favourites')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('Favourites', (table) => {
          table.string('userName').notNullable()
          table.string('favouritedItemId').notNullable()
        })
        .then(() => {
          console.log('Table \'Favourites\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating the Favourites table: ${error}`)
        })
    }
  })
  .then(() => {
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// Log all data in "users" table
knex.select('*').from('Users')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex
