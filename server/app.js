const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));

module.exports = app;
