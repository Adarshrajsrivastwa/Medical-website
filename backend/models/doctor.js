const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: { type: String, unique: true, default: "" },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'doctor' },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date },
    is_verified: { type: Boolean, default: false },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    specialization: {
      type: String,
    },
    charges: {
      type: Number,
    },
    hospital: {
      type: String
    },
    certificate: {
      type: String, 
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    languages: [{
      type: String,
    }]
  },
  { timestamps: true } 
);
 module.exports = User = mongoose.model('Doctor', doctorSchema);