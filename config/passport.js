const passport = require('passport');
const Person = require('../models/persons');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => Person.findById(id, (err, user) => done(err, user)));

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    req.checkBody('password', 'Password must not be less than 8 characters').notEmpty().isLength({ min: 8 });
    req.checkBody('password', 'Passwords do not match').notEmpty().equals(req.body["pre-password"]);

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach((error) => messages.push(error.msg));
        return done(null, false, req.flash('error', messages));
    }

    Person.findOne({ 'login.username': username, 'login.role': 'customer' }, (err, user) => {
        if (err) {
            console.log(`-------------${err}`);
            return done(err);
        }
        if (user) {
            return done(null, false, req.flash('error', 'Username is already in use!'));
        }

        var person = new Person();

        person.login.username = username;
        person.login.password = person.encryptPassword(password);
        person.login.role = 'customer';

        person.info.name = req.body.name;
        person.info.date_of_birth = Date.parse(req.body.date_of_birth);
        person.info.sex = req.body.sex;
        person.info.email = req.body.email;
        person.info.phone_number = req.body.phone_number;
        person.info.address = req.body.address;

        person.save((err, result) => {
            if(err) {
                done(err);
            }
            return done(null, person);
        });
    })
}));

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    Person.findOne({ 'login.username': username, 'login.role': 'customer' }, (err, user) => {
        if (err) {
            console.log(`-------------${err}`);
            return done(err);
        }
        if (!user) {
            return done(null, false, req.flash('error', 'No user found!'));
        }
        if (!user.validPassword(password, user.login.password)) {
            return done(null, false, req.flash('error', 'Wrong password!'));
        }

        return done(null, user);
    })
}));