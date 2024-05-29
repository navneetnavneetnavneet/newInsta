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
  loggedInUserAndFindUserPost,
  loggedInUserAndFindUserSavePost,
  finduserProfilePage,
  loggedInUserStory,
  allUserStory,
  storyLike,
  followAndfollowing,
  chatPage,
  chatMessagePage,
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

// loggedIn and finduser user ki post show karna
router.get("/user/post/:userId", isLoggedIn, loggedInUserAndFindUserPost);

// loggedIn and finduser user ki saved post show karna
router.get("/user/save/:userId", isLoggedIn, loggedInUserAndFindUserSavePost);

// finduser ki profile show karna
router.get("/profile/:username", isLoggedIn, finduserProfilePage);

// follow and following
router.get("/follow/:finduserId", isLoggedIn, followAndfollowing);

// loggedIn user ki story show karna
router.get("/story/:number", isLoggedIn, loggedInUserStory);

// all user ki story show karna
router.get("/story/:userId/:number", isLoggedIn, allUserStory);

// story like
router.get("/like/story/:storyId", isLoggedIn, storyLike);

// chat page
router.get("/chat", isLoggedIn, chatPage);

// chatmessage page
router.get("/chat/user/:userId", isLoggedIn, chatMessagePage);



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
