var express = require('express');
var router = express.Router();


router.get('/smartphones/android', function (req, res) {
  res.render('android/android')
});



module.exports = router;