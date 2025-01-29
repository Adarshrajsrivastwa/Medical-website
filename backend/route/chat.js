const express = require('express');
const User= require('../models/chat');

const router = express.Router();

const saveChatMessage = async (userId, message, sender) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const newMessage = {
      message: message,
      sender: sender,
      timestamp: new Date(),
    };

    user.data.chat_history.push(newMessage);
    await user.save();

    console.log('Message saved successfully');
    return user;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};





router.post('/sendMessage', async (req, res) => {
  const { userId, message, sender } = req.body;

  try {
    const updatedUser = await saveChatMessage(userId, message, sender);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
