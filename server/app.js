const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://service1:teb001me@ds249727.mlab.com:49727/apiauthenticationtest', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://service1:teb001me@ds253587.mlab.com:53587/apiauthentication', { useMongoClient: true });
}

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
const corsOptions = {
  origin: '*',
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
 "Access-Control-Allow-Headers":"GET,POST,PUT,DELETE,OPTIONS",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors());
// app.use(function(req, res, next) { 
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "GET,POST,PUT,DELETE,OPTIONS");
//   next();
// });
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));
app.use('/firm', require('./routes/firm'));
app.use('/process-defination', require('./routes/process-defination'));
app.use('/upload-handler', require('./routes/upload-handler'));

module.exports = app;
