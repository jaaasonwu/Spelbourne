// Load up the user model
const User = require('./userModel');

// Create local user
let createLocalUser = function(email, password, done) {
    // Crate a new user
    let newUser = new User();

    // Set local credentials
    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);

    // Save the user
    newUser.save(function (err) {
        if (err) {
            throw err;
        }

        return done(null, newUser);
    });
};

// Create user with facebook account
let createFacebookUser = function(profile, token, done) {
    // Crate a new user
    let newUser = new User();

    newUser.facebook.id = profile.id;
    newUser.facebook.token = token;
    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    newUser.facebook.email = profile.emails[0].value;

    // Save the user
    newUser.save(function (err) {
        if (err) {
            throw err;
        }

        return done(null, newUser);
    });
};
// Create user with google account
let createGoogleUser = function(profile, token, done) {
    // Crate a new user
    let newUser = new User();

    newUser.google.id    = profile.id;
    newUser.google.token = token;
    newUser.google.name  = profile.displayName;
    newUser.google.email = profile.emails[0].value; // pull the first email

    // Save the user
    newUser.save(function (err) {
        if (err) {
            throw err;
        }

        return done(null, newUser);
    });
};

// Export all user creation functions
module.exports = {
    createLocalUser : createLocalUser,
    createFacebookUser : createFacebookUser,
    createGoogleUser : createGoogleUser
};
