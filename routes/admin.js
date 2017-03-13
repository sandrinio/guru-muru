var express = require('express');
var router = express.Router();

router.get('/admins/admin-panel', function (req, res) {
  res.render('admin/admin-panel');
});

module.exports = router;