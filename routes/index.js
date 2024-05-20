var express = require('express');
const { 
  singupPage,
  loginPage,
  profilePage,
  feedPage,
  editPage,
  uploadPage,
  searchPage,
} = require('../controllers/indexController');
var router = express.Router();

router.get('/', singupPage);

router.get("/login", loginPage);

router.get("/profile", profilePage);

router.get("/feed", feedPage);

router.get("/edit", editPage);

router.get("/search", searchPage);

router.get("/upload", uploadPage);

module.exports = router;
