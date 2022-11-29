const mongoose = require('mongoose');

const Users = require('./user');

mongoose.connect(
    'mongodb+srv://hansen:web@webprogramming.fboproe.mongodb.net/test',
);

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB server!');
});

module.exports = {
    db,
    Users,
};