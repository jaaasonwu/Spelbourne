// Load dependencies, these are third party libraries
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');
const User = require('./models/user');
const userfactor = require('./user-factory')

let loginConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to callback
}

let localStrategy = new LocalStrategy(
    loginConfig,
    function (req, email, password, done) {
        // User.findOne won't fire unless data is sent back
        process.nextTick(
            function () {
                User.findOne(
                    {
                        'local.email': email
                    },
                    function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        // Check to see if same email exists
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already exists'));
                        }

                        createLocalUser(eamil, password, done);
                    }
                );
            }
        );
    }
)

let facebookStrategy = new FacebookStrategy(
    {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ["emails", "displayName"]
    },
    function (token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            User.findOne({'facebook.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                }

                // If the user is found, then log them in
                if (user) {
                    return done(null, user);
                }

                createFacebookUser(profile, token, done);
            });
        });
    }
)

let googleStrategy = new GoogleStrategy(
    {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        returnURL: configAuth.googleAuth.callbackURL,
        realm: "http://localhost:8888/"
    },
    function (token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function () {

            // try to find the user based on their google id
            User.findOne({'google.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                }

                createFacebookUser(profile, token, done);
            });
        });
    }
)

let loginStrategy = new LocalStrategy(
    loginConfig,
    function (req, email, password, done) {
        User.findOne(
            {'local.email': email},
            function (err, user) {
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
            }
        );
    }
)

// Exports all strategies
module.exports = {
    localStrategy : localStrategy,
    googleStrategy : googleStrategy,
    facebookStrategy : facebookStrategy,
    loginStrategy : loginStrategy
}
