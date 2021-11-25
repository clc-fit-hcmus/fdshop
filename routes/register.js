var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signUI/register');
});

module.exports = router;