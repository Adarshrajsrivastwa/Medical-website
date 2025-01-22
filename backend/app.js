let express = require('express');
let app = express();
let sign= require('./route/sign');
let cors = require('cors');


var corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,        
};

app.use(cors(corsOptions));

app.use(express.json());  

app.use('/signup', sign);

app.get('/', (req, res) => {
    res.send("Testing phase");  
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
