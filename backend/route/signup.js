const nodemailer = require('nodemailer');
let express= require('express');

let app = express();

// OTP generate karne ke liye function
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); 
}

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'adarsh6205840092@gmail.com', 
    pass: 'Adarsh@9471'   
  }
});

let otp = generateOTP();

let mailOptions = {
  from: 'adarsh6205840092@gmail.com',
  to: 'recipient_email@example.com',  
  subject: 'Your OTP for Authentication', 
  html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>` 
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});
