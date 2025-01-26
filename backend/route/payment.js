const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');
let dotenv = require('dotenv');
const Payment = require('../models/payment.js');
const Razorpay = require('razorpay');

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
      await Payment.findOneAndUpdate(
        { orderId: razorpayOrderId },
        { paymentId: razorpayPaymentId, signature, status: 'completed' }
      );
      res.send('Payment verified successfully');
    } else {
      res.status(400).send('Payment verification failed');
    }
  });

  module.exports = app;