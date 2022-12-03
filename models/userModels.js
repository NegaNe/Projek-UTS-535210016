const { name } = require('ejs');
const connection = require('../connection')
const mongoose = require('mongoose');
const express = require('express')


const userSchema = mongoose.Schema({
  userName: String,
  userMail: String,
  userPass: String
})

console.log('userModels is On')

const userModels = mongoose.model('user', userSchema)
module.exports = {
  userModels
}

