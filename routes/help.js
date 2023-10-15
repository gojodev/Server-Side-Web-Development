var express = require('express');
var router = express.Router();

router.get('/help', function (req, res) {
    res.render('help');
});

module.exports = router;