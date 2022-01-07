const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs =  require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const moment = require('moment');
const validator = require('express-validator');
const csrf = require('csurf');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const indexRouter = require('./routes');

// models
const fds = require('./components/fds');
const comments = require('./components/comments')
const reservations = require('./components/reservations');
const deliveries = require('./components/deliveries');
const persons = require('./components/persons');
const histories = require('./components/histories');
const feedbacks = require('./components/feedbacks');

const app = express();

require('./config/passport')

const hbs = expressHbs.create({
  defaultLayout: 'layout', 
  extname: '.hbs',
  helpers: {
    if_even: function(conditional, options) {
      if((conditional % 2) == 0) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    times: function(n, block) {
      var accum = '';
      for(var i = 1; i < n + 1; ++i)
          accum += block.fn(i);
      return accum;
    },
    for: function(from, to, incr, block) {
      var accum = '';
      for(var i = from; i < to; i += incr)
          accum += block.fn(i);
      return accum;
    },
    dateFormat: function (date, options) {
      const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
      return moment(date).format(formatToUse);
    }
  }
});

// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({ 
  secret: 'fdshop', 
  resave: false, 
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(csrf({ cookie: true }));
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/', indexRouter);

app.use('/', fds);
app.use('/menu', fds);
app.use('/detail', fds);

app.use('/', persons);
app.use('/in', persons);
app.use('/up', persons);
app.use('/register', persons);
app.use('/aboutUser', persons);
app.use('/update', persons);

app.use('/', comments);
app.use('/comment', comments);

// data
app.use('/fds', fds);
app.use('/reservations', reservations);
app.use('/deliveries', deliveries);
app.use('/persons', persons);
app.use('/histories', histories);
app.use('/feedbacks', feedbacks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
