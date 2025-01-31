let express= require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const upload=require('../config/multer');
const user = require('../models/user');
const inventry=require('../models/inventry');

let app = express();
app.post('/inventory', async (req, res) => {
    try {
    //   const Hospital = req.body.newInventory.email;
    //   const type = req.body.newInventory.type;
    //   const name = req.body.newInventory.name;
    //   const quantity = req.body.newInventory.quantity;


         console.log(req.body.newInventory)

        const newUser = new inventry({
          Hospital: req.body.newInventory.email,
          type: req.body.newInventory.type,
          name: req.body.newInventory.name,
          quantity: req.body.newInventory.quantity,
        });
        await newUser.save();
        return res.status(200).json({ message: 'User created and item added successfully.' });
      }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  

module.exports = app;