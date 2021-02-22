// Import database
const knex = require('../db')

// Create new user
exports.usersCreate = async (req, res) => {
  knex('users')
    .insert({
      'userName': req.body.userName
    })
    .then(() => {
      res.json({
        message: `user ${req.body.userName} created.`
      })
    })
    .catch(err => {
      res.json({
        message: `There was an error creating ${req.body.userName} user: ${err}`
      })
    })
}

// Retrieve a user by name
exports.usersFind = async (req, res) => {
  knex
    .select('*')
    .from('Users')
    .where('userName', req.query.userName)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({
        message: `There was an error retrieving the user ${req.query.userName}: ${err}`
      })
    })
}

/*
var val = "water";
return knex('ingredients')
  .select()
  .where('name', val)
  .then(function(rows) {
    if (rows.length===0) {
      // no matching records found
      return knex('ingredients').insert({'name': val})
    } else {
      // return or throw - duplicate name found
    }
  })
  .catch(function(ex) {
    // you can find errors here.
  })
*/

// Retrieve saved favourites by userName
exports.getFavourites = async (req, res) => {
  knex
    .select('*')
    .from('favourites')
    .where({
      userName: req.body.userName
    })
    .then(favouritesData => {
      res.json(favouritesData)
    })
    .catch(err => {
      res.json({
        message: `There was an error retrieving favourites: ${err}`
      })
    })
}

// Remove specific user
exports.usersDelete = async (req, res) => {
  // Find specific user in the database and remove it
  knex('users')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({
        message: `user ${req.body.id} deleted.`
      })
    })
    .catch(err => {
      // Send a error message in response
      res.json({
        message: `There was an error deleting ${req.body.id} user: ${err}`
      })
    })
}

// Remove all users on the list
exports.usersReset = async (req, res) => {
  // Remove all users from database
  knex
    .select('*') // select all records
    .from('users') // from 'users' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({
        message: 'user list cleared.'
      })
    })
    .catch(err => {
      // Send a error message in response
      res.json({
        message: `There was an error resetting user list: ${err}.`
      })
    })
}

// Retrieve all users
exports.usersAll = async (req, res) => {
  // Get all users from database
  knex
    .select('*') // select all records
    .from('users') // from 'users' table
    .then(userData => {
      // Send users extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving users: ${err}`
      })
    })
}
