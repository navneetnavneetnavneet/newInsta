const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const passport = require("passport");
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

exports.profilePage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  res.render("profile", { footer: true, user });
};

exports.feedPage = async (req, res, next) => {
  const user = await userModel.findOne({username: req.session.passport.user});
  const posts = await postModel.find().populate("user");
  res.render("feed", { footer: true, user, posts });
};

exports.editPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("edit", { footer: true, user });
};

exports.searchPage = (req, res, next) => {
  res.render("search", { footer: true });
};

exports.uploadPage = async (req, res, next) => {
  res.render("upload", { footer: true });
};

exports.updateProfile = async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    {
      username: req.session.passport.user,
    },
    {
      username: req.body.username,
      name: req.body.name,
      bio: req.body.bio,
    }
  );
  if (req.file) {
    user.profileImage = req.file.filename;
  }
  await user.save();
  res.redirect("/profile");
};

exports.uploadPostAndStory = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      caption: req.body.caption,
      user: user._id,
      picture: req.file.filename,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/feed");
  } catch (error) {
    console.log("Error ", error.message);
  }
};
