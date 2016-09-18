const express = require('express');
const Promise = require('bluebird');
const crypto = require('crypto');
const path = require('path');
const ejs = require('ejs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const config = require('./config');
const routes = require('./routes/index');
const users = require('./routes/users');
const account = require('./routes/account');
const file = require('./routes/file');
const leave = require('./routes/leave');
const calendar = require('./routes/calendar');

const User = require('./models/user');
const Calendar = require('./models/calendar');

// for (let i = 1; i < 180; i++) {
//   Calendar.create({
//     date: 1472486400000 + 24 * 3600 * 1000 * i
//   });
// }

mongoose.Promise = Promise;
Promise.promisifyAll(crypto);

/*const fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync("packagse.json").then(JSON.parse).then(json => {
    console.log(json)
}).catch(SyntaxError, function (e) {
    console.error("file contains invalid json");
}).error(function (e) {
    console.error("unable to read file, because: ", e.message);
});*/

const app = express();

//  connect db
mongoose.connect(config.mongodb);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 1000 * 3600
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/file', file);
app.use('/api/leave', leave);
app.use('/api', account);
app.use('/api/calendar', calendar);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorhandler());
  // app.use(function(err, req, res, next) {
  //   res.status(err.status || 500).json({
  //     message: err.message
  //   });
  // });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err);
});

module.exports = app;
