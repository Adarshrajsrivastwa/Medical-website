const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

    let userschema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user'},
        date: {type: Date, default: Date.now}
    });

    module.exports = User = mongoose.model('Doctor', userschema);