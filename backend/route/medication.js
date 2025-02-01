let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');
const inventry=require('../models/inventry');
const doctor = require('../models/doctor');

let app = express();

app.post('/available',async(req,res)=>{
    let user=await inventry.find();
    console.log(user);
    if(user){
        res.status(200).send(user);
    }
    else{
        res.status(404).send('No medicines found');
    }
    
})

module.exports =app;