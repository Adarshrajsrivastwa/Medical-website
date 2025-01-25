const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

import mongoose from 'mongoose';

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: { type: String, unique: true, default: "" },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date },
    is_verified: { type: Boolean, default: false },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    specialization: {
      type: String,
      enum: ['cardiology', 'neurology', 'pediatrics', 'general'],
      required: true
    },
    charges: {
      type: Number,
      required: true
    },
    hospital: {
      type: String,
      default: null
    },
    certificate: {
      type: String, 
      required: true
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pinCode: {
      type: String,
      required: true
    },
    languages: [{
      type: String,
      enum: ['english', 'hindi', 'spanish', 'french']
    }]
  },
  { timestamps: true } 
);
 module.exports = User = mongoose.model('Doctor', userschema);