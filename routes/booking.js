var express = require('express');
var router = express.Router();

/* GET booking page. */
router.get('/', function (req, res) {
  res.render('booking');
});
router.get("/:id", (req, res) => {
    res.json({message: `your id is ${req.params.id}`})
})


module.exports = router;
