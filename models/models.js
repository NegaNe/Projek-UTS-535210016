const mongoose = require('mongoose');
const path = require('path');
const userModels = require('./userModels')
const user = require(path.join(__dirname, './userModels'));
const db = mongoose.connection;

db.once('open', () => {
  console.log('Mongoose is On');
});

module.exports = {
  db,
  user
}
