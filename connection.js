const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hansen:web@webprogramming.fboproe.mongodb.net/FTI21')

const db = mongoose.connection;
console.log('Connection is On')


