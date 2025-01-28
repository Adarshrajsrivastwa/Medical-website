const mongoose = require('mongoose');
let connectdb= require('../config/db');
const { model } = mongoose; 

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    data: {
      chat_history: [
        {
          timestamp: { type: Date, default: Date.now },
          message: String,
          sender:{ type: String, default:"recieved"}
        },
      ],
      preferences: {
        language: { type: String, default: "English" },
        theme: { type: String, default: "Light" },
      },
    },
  });
  
  const Chat = mongoose.model("Chat", userSchema);