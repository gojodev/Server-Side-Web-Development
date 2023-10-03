var express = require('express');
var router = express.Router();

// ! will default to the homepage (index.html) when app.js starts
/* GET home page. */
router.get('public', function (req, res) {
  res.render('index');
});

module.exports = router;
