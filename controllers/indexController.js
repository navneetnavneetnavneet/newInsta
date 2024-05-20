const userModel = require('../models/userModel');
const passport = require('passport');
const localStrategy = require("passport-local");

// local Strategy
passport.use(new localStrategy(userModel.authenticate()));

exports.registerUser = (req, res, next) => {
  const newUser = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  userModel.register(newUser, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/feed");
    });
  });
};

exports.loginUser = (req, res, next) => {};

exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    return next(err);
  });
  res.redirect("/login");
};

exports.singupPage = (req, res, next) => {
  res.render("index", { footer: false });
};

exports.loginPage = (req, res, next) => {
  res.render("login", { footer: false });
};

exports.profilePage = (req, res, next) => {
  res.render("profile", { footer: true });
};

exports.feedPage = (req, res, next) => {
  res.render("feed", { footer: true });
};

exports.editPage = (req, res, next) => {
  res.render("edit", { footer: true });
};

exports.searchPage = (req, res, next) => {
  res.render("search", { footer: true });
};

exports.uploadPage = (req, res, next) => {
  res.render("upload", { footer: true });
};
