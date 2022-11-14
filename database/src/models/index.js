const mongoose = require('mongoose');

const Users = require('./user');

mongoose.connect(
    'mongodb+srv://kelvin:1122334455@cluster0.mx0hj2d.mongodb.net/?retryWrites=true&w=majority',
);

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB server!');
});

module.exports = {
    db,
    Users,
};