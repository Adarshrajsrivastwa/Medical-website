let express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/user');
const Hospital = require('../models/hospital');
const Doctor=require('../models/doctor');

let app = express();

app.use(bodyParser.json());

app.post('/userdetail', async (req, res) => {
    try {
        const { role, email, phone, country, city, state, pincode, weight, height, bloodGroup, dob } = req.body;
        email = req.body.email
        if (role === 'patient') {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send("User not found");
            }
            user.phone = phone;
            user.country = country;
            user.city = city;
            user.state = state;
            user.pincode = pincode;
            user.weight = weight;
            user.height = height;
            user.bloodGroup = bloodGroup;
            user.dob = dob;
            await user.save();
            return res.status(200).send("Data saved successfully");
        } else {
            return res.status(400).send("Invalid role");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
});

module.exports = app;
