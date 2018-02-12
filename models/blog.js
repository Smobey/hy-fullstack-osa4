const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = Blog