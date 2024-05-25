const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
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
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  res.render("profile", { footer: true, user });
};

exports.feedPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  res.render("feed", { footer: true, user, posts });
};

exports.editPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("edit", { footer: true, user });
};

exports.searchPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("search", { footer: true, user });
};

exports.uploadPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("upload", { footer: true, user });
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

exports.seachUser = async (req, res, next) => {
  const regex = new RegExp("^" + req.params.username, "i");
  const users = await userModel.find({ username: regex });
  res.send(users);
};

exports.postLike = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.findOne({ _id: req.params.postId });
    if (post.likes.indexOf(user._id) === -1) {
      post.likes.push(user._id);
    } else {
      post.likes.splice(post.likes.indexOf(user._id), 1);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    // console.log(error);
  }
};

exports.postSave = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.findOne({ _id: req.params.postId });

    if (user.savePosts.indexOf(post._id) === -1) {
      user.savePosts.push(post._id);
    }
    await user.save();
    res.redirect("/feed");
  } catch (error) {
    // console.log(error);
  }
};

exports.postSavePage = async (req, res, next) => {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("savePosts");
  res.render("save", { footer: true, user });
};

exports.postCommentPage = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.findOne({ _id: req.params.postId }).populate({
    path: "comments",
    populate: {
      path: "users",
    },
  });

  // console.log(post)

  res.render("comment", { footer: true, user, post });
};

exports.postComment = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.findOne({ _id: req.params.postId });

    const comment = await commentModel.create({
      comment: req.body.comment,
      post: post._id,
    });
    comment.users.push(user._id);
    post.comments.push(comment._id);
    await comment.save();
    await post.save();
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};
