var express = require('express');
var router = express.Router();

// todo: move your html files to the routes folder
// ! will default to the homepage (index.html) when app.js starts
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;
