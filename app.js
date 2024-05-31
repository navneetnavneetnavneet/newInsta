require("dotenv").config({
  path: "./.env"
})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require("express-session");
const userModel = require("./models/userModel");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require("passport");
const MongoStore = require("connect-mongo");

var app = express();

// db connection
require("./db").connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hello",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    autoRemove: "native"
  })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

userModel.find().then(async allUsers => {
  await Promise.all(allUsers.map(async singleUser => {
    singleUser.socketId = ""
    await singleUser.save()
  }))
})

module.exports = app;
