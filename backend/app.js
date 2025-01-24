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

app.get('/', (req, res) => {
    res.send("Testing phase");  
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
