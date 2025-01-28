let express = require('express');
let app = express();
let sign= require('./route/signup');
let cors = require('cors');
const cookieParser = require('cookie-parser');
let dotenv = require('dotenv');
let mongoose= require('mongoose');
let session= require('express-session');
let connectdb= require('./config/db.js');
let details= require('./route/detail');
let loading= require('./route/doctorsearch');
let payment= require('./route/payment');
const hospital= require('./route/bed');

dotenv.config();
connectdb();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,   
  resave: false,             
  saveUninitialized: false,  
}));


app.use(cookieParser());


var corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,        
};

app.use(cors(corsOptions));

app.use('/sign', sign);
app.use('/detail', details);
app.use('/loading', loading);
app.use('/payment', payment);
app.use('/hospital',hospital)

app.get('/', (req, res) => {
    res.send("Testing phase");  
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
