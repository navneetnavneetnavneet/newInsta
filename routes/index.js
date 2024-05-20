var express = require('express');
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
} = require('../controllers/indexController');
const passport = require("passport");
var router = express.Router();

router.get('/', singupPage);

router.get("/login", loginPage);

router.get("/profile", isLoggedIn, profilePage);

router.get("/feed", isLoggedIn, feedPage);

router.get("/edit", isLoggedIn, editPage);

router.get("/search", isLoggedIn, searchPage);

router.get("/upload", isLoggedIn, uploadPage);


// passport setup
router.post("/register", registerUser)

router.post("/login", passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/login"
}), loginPage)

router.get("/logout", logoutUser)

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/login");
  }
}

module.exports = router;
