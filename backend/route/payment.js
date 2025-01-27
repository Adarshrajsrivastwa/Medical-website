const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');
let dotenv = require('dotenv');
const Payment = require('../models/payment.js');
const Razorpay = require('razorpay');
const Appointment=require('../models/appointment.js');


let app = express();


dotenv.config();

app.use(bodyParser.json());


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,   
    key_secret: process.env.RAZORPAY_KEY_SECRET  
  });
  
  app.post('/create/orderId', async (req, res) => {
    console.log("working")
    const options = {
      amount: req.body.price*100,
      currency: "INR",
    };
  
    try {
      const order = await razorpay.orders.create(options); 
      res.send(order);
      await Payment.create({
        orderId: order.id,
        amount: order.amount / 100, 
        currency: order.currency,
        status: 'pending',
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).send('Error creating order');
    }
  });
  
  app.post('/api/payment/verify', async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const crypto = require('crypto');
  
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
  
    if (generatedSignature === signature) {
      try {
        // Update the payment status in the database
        await Payment.findOneAndUpdate(
          { orderId: razorpayOrderId },
          { paymentId: razorpayPaymentId, signature, status: 'completed' }
        );
  
        // Extract date and other form data
        const date = req.body.formData.date;
        const targetDate = new Date(date).getTime();
        
        if (isNaN(targetDate)) {
          return res.status(400).send('Invalid date format');
        }
  
        // Log the extracted form data for debugging
        console.log('Form data:', req.body.formData);
        console.log('Converted target date:', targetDate);
  
        // Create the appointment
        const appointment = new Appointment({
          patient: req.body.formData.patientName,
          issue: req.body.formData.issue,
          doctor: req.body.formData.doctor,
          date: targetDate, // Ensure this is a valid date format
          timeSlot: req.body.formData.timeSlot,
        });
  
        // Save the appointment to the database
        await appointment.save();
  
        res.send('Payment verified and appointment created successfully');
      } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).send('Internal server error');
      }
    } else {
      res.status(400).send('Payment verification failed');
    }
  });
  

  module.exports = app;