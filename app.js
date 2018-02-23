//import dependency
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config=require('./config/database');

// [SH] Bring in the data model
require('./models/db');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');

//load the server in app
const app = express();

//users routes files
const users=require('./routes/users');
const transactions = require('./routes/transaction');

//port number
const port = 3000;

//cors middleware
app.use(cors());

//set static folders
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);

//user route use
app.use('/users',users);
app.use('/transactions', transactions);

//index route
app.get('/',(req, res)=> {
    res.send('Invalid EndPoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

//start server
app.listen(port, () => {
    console.log('Server Started Port No::: ' + port)
});
