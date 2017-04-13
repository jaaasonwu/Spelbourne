// Load all the strategies
const strategies = require('./passport-strategy')
// Load up the user model

const User = require('../user/userModel');

// Exposed function
module.exports = function (passport) {
    /*
      Passport session setup required for persistent login sessions
      passport needs ability to serialize and deserialize users
      used to serialize the user for the session
    */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // Sign up strategy
    passport.use(
        'local-signup',
        strategies.localStrategy
    );

    // Local login
    passport.use(
        'local-login',
        strategies.loginStrategy
    );

    // Facebook Login
    passport.use(strategies.facebookStrategy);

    // google login
    passport.use(strategies.googleStrategy);
};
