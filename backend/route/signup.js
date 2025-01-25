const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');

let app = express();
app.use(bodyParser.json()); 

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); 
}

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'srivastwaadarsh@gmail.com', 
    pass: 'hkvw vikl mqdp pcoz'   
  }
});

app.post('/signup', async (req, res) => {
  try {
    const otp = generateOTP();
    const email = req.body.email;
    let user;

    // Check if user exists based on role
    switch (req.body.role) {
      case 'patient':
        user = await User.findOne({ email });
        break;
      case 'doctor':
        user = await Doctor.findOne({ email });
        break;
      case 'hospital':
        user = await Hospital.findOne({ email });
        break;
      default:
        return res.status(400).send('Invalid role');
    }

    if (user) {
      return res.status(400).send('User already exists');
    }

    // Create a new user based on role
    let newUser;
    if (req.body.role === 'patient') {
      newUser = new User({ email, otp });
    } else if (req.body.role === 'doctor') {
      newUser = new Doctor({ email, otp });
    } else 
     {
      newUser = new Hospital({ email, otp });
    }

    // Save the new user to the database
    await newUser.save();

    // Email options
    const mailOptions = {
      from: {
        name: 'CareSpaceX',
        address: 'srivastwaadarsh@gmail.com',
      },
      to: email,
      subject: 'Your OTP for Authentication',
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>`
    };

    // Send OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error sending OTP: ' + error);
      }
      res.status(200).send('OTP sent successfully!');
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


app.post('/signin', async (req, res) => {
  let otp = generateOTP(); 
  let email = req.body.email;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      return res.status(404).send({ message: "User not found" }); 
    }
    let mailOptions = {
      from: {
        name: 'CareSpaceX',
        address: 'srivastwaadarsh@gmail.com',
      },
      to: email,  
      subject: 'Your OTP for Authentication',
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error); // Log the error
        return res.status(500).send({ message: 'Error sending OTP email. Please try again later.' });
      }
      res.status(200).send({ message: 'OTP sent successfully!' });
    });
  } catch (error) {
    console.error("Internal server error:", error);  
    return res.status(500).send({ message: 'Internal server error. Please try again later.' });
  }
});


app.post('/verify-otp',async(req, res) => {
  let email=req.body.email;
  let otp=req.body.otp;

  if(req.body.role==='patient'){
  let user= await User.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
}
else if(req.body.role==='doctor'){
  let user= await Doctor.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
}
else
{
  let user= await Hospital.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
}
})

app.post('/login',async(req, res) => {
  let otp=req.body.otp;
  console.log('otp login successfully');
  let user= await User.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
})
module.exports = app;
