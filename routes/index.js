var express = require("express");
const {
  singupPage,
  loginPage,
  profilePage,
  feedPage,
  editPage,
  uploadPage,
  searchPage,
  registerUser,
  logoutUser,
  updateProfile,
  uploadPostAndStory,
  seachUser,
  postLike,
  postSavePage,
  postSave,
  postCommentPage,
  postComment,
} = require("../controllers/indexController");
const passport = require("passport");
var router = express.Router();
const upload = require("../middleware/multer");

router.get("/", singupPage);

router.get("/login", loginPage);

router.get("/profile", isLoggedIn, profilePage);

router.get("/feed", isLoggedIn, feedPage);

router.get("/edit", isLoggedIn, editPage);

router.get("/search", isLoggedIn, searchPage);

router.get("/upload", isLoggedIn, uploadPage);

// edit profile
router.post("/update", isLoggedIn, upload.single("image"), updateProfile);

// upload post and story
router.post("/upload", isLoggedIn, upload.single("image"), uploadPostAndStory);

// search user with username
router.get("/user/:username", isLoggedIn, seachUser);

// like post
router.get("/like/:postId", isLoggedIn, postLike);

// save post page
router.get("/save", isLoggedIn, postSavePage);

// post save karna
router.get("/save/:postId", isLoggedIn, postSave);

// comment post page
router.get("/comment/:postId", isLoggedIn, postCommentPage);

// comment create karna
router.post("/comment/post/:postId", isLoggedIn, postComment);












// passport setup
router.post("/register", registerUser);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
  }),
  loginPage
);

router.get("/logout", logoutUser);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
