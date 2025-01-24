const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

    let userschema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        role: {type: String, default: 'hospital'},
        date: {type: Date, default: Date.now}
    });

    module.exports = model('Hospital', userschema);
