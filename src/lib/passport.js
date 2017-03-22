// load dependencies
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
const User = require('./models/user');

const configAuth = require('./auth');

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

    // Facebook Login
    passport.use(new FacebookStrategy({
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

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user);
                    } else {
                        // new user
                        let newUser = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        console.log(profile);
                        newUser.facebook.email = profile.emails[0].value;

                        // save to the database
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

    // google login
    passport.use(new GoogleStrategy({

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

                    // If the user isnt in our database, create a new user
                    let newUser = new User();

                    // Set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });

                });
            });
        }));
};