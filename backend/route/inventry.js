const express = require('express');
const inventry = require('../models/inventry');

let app = express();

app.use(express.json());

app.post('/inventory', async (req, res) => {
    try {
        const newItem = new inventry({
          Hospital: req.body.newInventory.email,
          type: req.body.newInventory.type,
          name: req.body.newInventory.name,
          quantity: req.body.newInventory.quantity,
        });

        await newItem.save();
        return res.status(200).json({ message: 'Item added to inventory successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

app.post('/collect', async (req, res) => {
    try {
        const userItems = await inventry.find({ Hospital: req.body.email });
        
        if (!userItems || userItems.length === 0) {
            return res.status(404).json({ message: 'No inventory found for this hospital.' });
        }

        return res.status(200).json({ items: userItems });
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = app;
