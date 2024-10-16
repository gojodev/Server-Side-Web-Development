var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index', function (req, res) {
  res.render('index');
});

router.get('/index.html', function (req, res) {
  res.render('index');
});

router.get('/index.ejs', function (req, res) {
  res.render('index');
});

router.get('/about', function (req, res) {
  res.render('about');
});

router.get('/help', function (req, res) {
  res.render('help');
});

router.get('/booking', function (req, res) {
  res.render('booking');
});

module.exports = router;