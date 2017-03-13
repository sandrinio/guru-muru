var middlewareObject = {};

middlewareObject.permissionChecker = function (req, res, next) {
  if(req.isAuthenticated() && req.user.permission === "admin"){
    next();
  } else {
    req.flash("error", "no permission");
    res.redirect("back");
  }
};


middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }else{
    res.redirect("/")
  }
};


module.exports = middlewareObject;