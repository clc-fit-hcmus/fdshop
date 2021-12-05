var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET signUI pages
router.get('/register', function(req, res, next) {
  res.render('signUI/register');
});

router.get('/in', function(req, res, next) {
  res.render('signUI/signIn');
});

router.get('/up', function(req, res, next) {
  res.render('signUI/signUp');
});

module.exports = router;
