var express = require('express');
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");
var User = require('../models/user');


router.get('/landing/login', function (req, res) {
  res.render('auth/login');
});

router.get('/landing/register', function (req, res) {
  res.render('auth/register')
});

router.post('/landing/register', function (req, res) {
  if(req.body.password === req.body.pass2) {
    var userInfo = req.body.user;
    userInfo.pic = 'user-icon.png';
    User.register(userInfo, req.body.password, function (err, user) {
      if(err){
        res.send(err)
      }else{
        res.redirect('/landing/login')
      }
    })
  }else{
    res.send('Password Typo')
  }
});

router.post("/landing/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/landing/login"
}), function (req, res) {
  req.flash("success", 'Welcome');
  res.redirect("back");
});

router.get("/landing/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/");
});




module.exports = router;