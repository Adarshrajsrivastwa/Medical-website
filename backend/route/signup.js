const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');

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

app.post('/signup', async(req, res) => {

  let otp = generateOTP();
  let email=req.body.email;
  console.log(email);

  let user= await User.findOne({email: email});
  if(user){
    return res.status(400).send('user already exists');
  }
  else{
    let newUser = new User({email: email, otp: otp});
    await newUser.save();
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
      return res.status(500).send('Error: ' + error);
    }

    res.status(200).send('OTP sent successfully!');
  });
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
      return res.status(404).send({ message: "User not found" }); // Fixed closing parenthesis
    }

    // Prepare the mail options
    let mailOptions = {
      from: {
        name: 'CareSpaceX',
        address: 'srivastwaadarsh@gmail.com',
      },
      to: email,  
      subject: 'Your OTP for Authentication',
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>`
    };

    // Send the OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error); // Log the error
        return res.status(500).send({ message: 'Error sending OTP email. Please try again later.' });
      }

      // If email is sent successfully
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
  let user= await User.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
})

app.post('/login',async(req, res) => {
  let otp=req.body.otp;
  let email=req.body.email;
  console.log('otp login successfully');
  let user= await User.findOne({email: email});
  if(user && user.otp === otp){
    res.status(200).send('OTP verified successfully!');
  }
})
module.exports = app;
