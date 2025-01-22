const nodemailer = require('nodemailer');
let express= require('express');
const bodyParser = require('body-parser');

let app = express();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); 
}

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  host:"smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'srivastwaadarsh@gmail.com', 
    pass: 'hkvw vikl mqdp pcoz'   
  }
});

let otp = generateOTP();

let mailOptions = {
  from:{
    name: 'CareSpaceX',
    address: 'srivastwaadarsh@gmail.com',
  },
  to: 'harshitpatle585@gmail.com',  
  subject: 'Your OTP for Authentication', 
  html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>` 
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});

app.post('/signup', (req, res) => {
    console.log("hello from backend");
})

module.exports = app;