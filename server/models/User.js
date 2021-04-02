const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: String,
    password: String,
});

module.exports = model('User', userSchema);