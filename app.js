const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const menuRouter = require('./routes/menu');
const detailRouter = require('./routes/detail');
const signInRouter = require('./routes/signIn');
const signUpRouter = require('./routes/signUp');
const registerRouter = require('./routes/register');

// models
const fds = require('./routes/fds');
const reservations = require('./routes/reservations');
const deliveries = require('./routes/deliveries');
const persons = require('./routes/persons');
const histories = require('./routes/histories');
const feedbacks = require('./routes/feedbacks');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);
app.use('/detail', detailRouter);
app.use('/in', signInRouter);
app.use('/up', signUpRouter);
app.use('/register', registerRouter);

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

const port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
