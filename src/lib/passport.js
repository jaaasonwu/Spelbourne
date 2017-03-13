// load dependencies
const LocalStrategy = require('passport-local');

// load up the user model
const User = require('./models/user');

// exposed function
module.exports = function (passport) {
    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // sign up strategy
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to callback
        },
        function (req, email, password, done) {
            // async
            // User.findOne won't fire unless data is sent back
            process.nextTick(function () {
                User.findOne({
                        'local.email': email
                    },
                    function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        // check to see if same email exists
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already exists'));
                        } else {
                            // crate a new user
                            let newUser = new User();

                            // set local credentials
                            newUser.local.email    = email;
                            newUser.local.password = newUser.generateHash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
            });
        }));

    // Local login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passportField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found'));
                }

                // if the user user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));
                }

                return done(null, user);
            });
        }));
};