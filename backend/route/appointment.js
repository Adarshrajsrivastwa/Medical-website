const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');
const appointment = require('../models/appointment');

let app = express();

app.use('/appointment', async (req, res) => {
    let email = req.body.email;
    console.log(email);
    try {
        let user = await appointment.find({ doctor: email });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving appointments');
    }
});


module.exports =app;