// Load dependencies, these are third party libraries
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

const configAuth  = require('./auth');
const User        = require('./models/user');
const userFactory = require('./user-factory');

let loginConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to callback
};

// Signup strategy
let localStrategy = new LocalStrategy(
    loginConfig,
    function (req, email, password, done) {
        // User.findOne won't fire unless data is sent back
        process.nextTick(
            function () {
                //  Whether we're signing up or connecting an account, we'll need
                //  to know if the email address is in use.
                User.findOne({'local.email': email}, function(err, existingUser) {

                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if there's already a user with that email
                    if (existingUser){
                        console.log('That email is already taken');
                        return done(null, false, req.flash('signupMessage', 'That email is already taken!'));
                    }

                    //  If we're logged in, we're connecting a new local account.
                    if (req.user) {
                        let user            = req.user;
                        user.local.email    = email;
                        user.local.password = user.generateHash(password);
                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    }
                    //  We're not logged in, so we're creating a brand new user.
                    else {
                        userFactory.createLocalUser(email,password,done)
                    }

                });
            }
        );
    }
);

let facebookStrategy = new FacebookStrategy(
    {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ["emails", "displayName"],
        passReqToCallback: true
    },
    function (req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            // check if the user is already logged in
            if (!req.user) {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    // If the user is found, then log them in
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    }

                    userFactory.createFacebookUser(profile, token, done);
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                let user = req.user;

                // update the current users facebook credentials
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                // save the user
                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }

        });
    }
);

let googleStrategy = new GoogleStrategy(
    {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        returnURL: configAuth.googleAuth.callbackURL,
        realm: "http://localhost:8888/",
        passReqToCallback: true
    },
    function (req, token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function () {
            // To see if user exists
            if (!req.user) {
                // try to find the user based on their google id
                User.findOne({'google.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    }

                    userFactory.createGoogleUser(profile, token, done);
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                let user = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email

                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }
);

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
                    console.log('No user found');
                    return done(null, false, req.flash('loginMessage', 'No user found!'));
                }

                // if the user user is found but the password is wrong
                if (!user.validPassword(password)) {
                    console.log('password invalid');
                    return done(null, false, req.flash('loginMessage', 'Wrong password!'));
                }

                return done(null, user);
            }
        );
    }
);

// Exports all strategies
module.exports = {
    localStrategy: localStrategy,
    googleStrategy: googleStrategy,
    facebookStrategy: facebookStrategy,
    loginStrategy: loginStrategy
};
