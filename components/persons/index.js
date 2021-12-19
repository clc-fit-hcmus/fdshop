const express = require('express');
const {postPerson, getPersons, getPerson, updatePerson } = require("./personsController");
const csrf = require('csurf');
const passport = require('passport');

const router = express.Router();

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/update', isLoggedIn, function(req, res, next) {
  res.render('signUI/update');
});

router.get('/aboutUser', isLoggedIn, function(req, res, next) {
  const user = req.user.toJSON();
  res.render('users/about', { user });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
})

router.use('/', notLoggedIn, function(req, res, next) {
  next();
})

router.get('/persons', getPersons);
router.get('/persons/:phone', getPerson);
router.post('/persons/add', postPerson);
router.post('/persons/add', updatePerson);

// GET signUI pages
router.get('/register', function(req, res, next) {
  res.render('signUI/register');
});

router.get('/in', function(req, res, next) {
  const messages = req.flash('error');
  res.render('signUI/signIn', { csrfToken: req.csrfToken(), body: req.query, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/in', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/in',
  failureFlash: true
}));

router.get('/up', function(req, res, next) {
  const messages = req.flash('error');
  res.render('signUI/signUp', { csrfToken: req.csrfToken(), body: req.query, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/up', passport.authenticate('local.signup', {
  successRedirect: '/aboutUser',
  failureRedirect: '/up',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}