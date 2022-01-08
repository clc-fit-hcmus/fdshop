const express = require('express');
const {postPerson, getPersons, getPerson, updatePerson } = require("./personsController");
const csrf = require('csurf');
const passport = require('passport');
const {isLoggedIn, notLoggedIn} = require('../../utils/login');

const router = express.Router();

router.get('/update', isLoggedIn, function(req, res, next) {
  const user = req.user.toJSON();
  const errorMessages = req.flash('error');
  res.render('signUI/update', { user, errorMessages: errorMessages, hasErrors: errorMessages.length > 0 });
});

router.get('/aboutUser', isLoggedIn, function(req, res, next) {
  const user = req.user.toJSON();
  res.render('users/about', { user });
});

router.post('/update', isLoggedIn, passport.authenticate('local.update', {
  successRedirect: '/aboutUser',
  failureRedirect: '/update',
  failureFlash: true
}));

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
})

router.get('/persons', getPersons);
router.get('/persons/:phone', getPerson);
router.post('/persons/add', postPerson);

// GET signUI pages
router.get('/register', function(req, res, next) {
  res.render('signUI/register');
});

router.get('/in', function(req, res, next) {
  const messages = req.flash('error');
  res.render('signUI/signIn', { body: req.query, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/in', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/in',
  failureFlash: true
}));

router.get('/up', function(req, res, next) {
  const messages = req.flash('error');
  res.render('signUI/signUp', { body: req.query, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/up', passport.authenticate('local.signup', {
  successRedirect: '/aboutUser',
  failureRedirect: '/up',
  failureFlash: true
}));

module.exports = router;