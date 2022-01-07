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

  function both(req, res, next) {
    return next();
  }

  module.exports = {isLoggedIn, notLoggedIn, both}