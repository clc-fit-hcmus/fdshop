const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {engine} = require('express-handlebars');

const indexRouter = require('./routes');

// models
const fds = require('./components/fds');
const reservations = require('./components/reservations');
const deliveries = require('./components/deliveries');
const persons = require('./components/persons');
const histories = require('./components/histories');
const feedbacks = require('./components/feedbacks');

const app = express();

// view engine setup
app.engine('.hbs', engine({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu', indexRouter);
app.use('/detail', indexRouter);
app.use('/in', indexRouter);
app.use('/up', indexRouter);
app.use('/register', indexRouter);

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
