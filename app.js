var express = require("express");
var app = express();

var mongoose       = require("mongoose"),
    passport       = require("passport"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    session        = require("express-session"),
    methodOverride = require("method-override"),

    User           = require("./models/user");
    
var landingRoutes     = require('./routes/landing.js'),
    androidRoutes     = require('./routes/android'),
    newsRoutes        = require('./routes/news'),
    authRoutes        = require('./routes/auth'),
    applicationRoutes = require('./routes/applications'),
    news_clientRouted = require('./routes/news_client');
    
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());    
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(flash());
    app.use(methodOverride("_method"));
  
    app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });  
  
    app.use(landingRoutes);
    app.use(androidRoutes);
    app.use(newsRoutes);
    app.use(authRoutes);
    app.use(applicationRoutes);
    app.use(news_clientRouted);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://sandrinio:kukuruku321@ds157839.mlab.com:57839/gsm-guru");
// mongoose.connect("mongodb://localhost/gsm_guru");









  





/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში

var port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function () {  //if server is on
  console.log("======STARTED======");
  console.log("PORT: " + port);
  console.log("PORT: " + process.env.IP);
});