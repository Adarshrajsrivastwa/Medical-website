let express = require('express');
const bodyParser = require('body-parser');
let chat = require('../models/chat');

let app = express();

app.post('/chat', async function(req, res) {
    try {
        let users = await chat.find({
            $or: [
                { sender: req.body.sender, recipient: req.body.recipient },
                { sender: req.body.recipient, recipient: req.body.sender }
            ]
        });

        if (users.length === 0) {
            res.json({ message: "Hello, how can I help you?" });
        } else {
            const allSortedMessages = users.map(user => {
                const sortedMessages = Array.isArray(user.messages)
                    ? user.messages.sort((a, b) => b.timestamp - a.timestamp)
                    : []; 

                return {
                    ...user.toObject(),  
                    sortedMessages
                };
            });

            console.log(allSortedMessages); 
            res.json(allSortedMessages); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
    }
});





module.exports =app;