const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');


let app = express();

app.post('/new', async (req, res) => {
  try {
    const { city, state, country } = req.body;
    const doctors = await Doctor.find({ city, state, country });
    res.json({ doctors });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
});



module.exports =app;