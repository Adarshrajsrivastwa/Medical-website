const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

let userschema = new mongoose.Schema({
    name: {type: String, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: 'user'},
    otp: {type: String, default: ''},
    otp_expiry: {type: Date},
    is_verified: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
});


module.exports = model ('User',userschema);