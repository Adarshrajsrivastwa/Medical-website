let express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const upload=require('../config/multer');

let app = express();

app.use(bodyParser.json());

app.post('/userdetail', async (req, res) => {
    try {
        const { role, email, phone, country, city, state, pinCode, weight, height, bloodGroup, date,gender } = req.body;
        if (role === 'patient') {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send("User not found");
            }
            user.phone = phone;
            user.country = country.label;
            user.city = city.label;
            user.state = state.label;
            user.pincode = pinCode;
            user.weight = weight;
            user.height = height;
            user.bloodGroup = bloodGroup.value;
            user.dob = date;
            user.gender = gender.value;
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

app.post('/doctordetail',upload.single('certificate'), async (req, res) =>{
    
    return res.status(200).send("working")
    
})

module.exports = app;