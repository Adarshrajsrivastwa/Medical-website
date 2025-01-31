const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const appointment = require('../models/appointment');

let app = express();

app.post('/appointment', async (req, res) => {
    let email = req.body.email;
    console.log(email);
    try {
        let user = await appointment.find({ doctor: email });
        if (user.status === 'pending')

            res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving appointments');
    }
});


app.post('/update', async (req, res) => {
    try {
        const { approval, unique } = req.body;
        const id = unique;
        const user = await appointment.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        console.log(user);
        user.status = approval;
        await user.save();

        return res.status(200).json({ message: 'Appointment updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = app;