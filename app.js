//require('./models/db');
const mongoose = require('mongoose');
require('./models/datamodels');
var createError = require('http-errors');
var express = require('express');
var dotenv = require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');


var indexRouter = require('./routes/index');


var app = express();

console.log(dotenv.parsed);

const db = process.env.MONGODB_URI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,
      useUnifiedTopology: true,
      retryWrites: true
    })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
