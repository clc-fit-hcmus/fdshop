var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('fds/detail');
});

module.exports = router;