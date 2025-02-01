let express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const appointment = require('../models/appointment');
const bed=require('../models/bed');

let app = express(); 

app.post('/doctor', async (req, res) => {
    let user = await Doctor.find({ status: 'pending' });

    console.log(user);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('No pending doctors found');
    }
});





module.exports =app;