const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = mongoose.model('User', {
    username: { type: String, unique: true },
    name: String,
    passwordHash: String,
    adult:  { type: Boolean, default: true }
  })

module.exports = User