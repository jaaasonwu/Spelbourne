// Functions to save users to the database using local, facebook or google.

// Load up the user model
const User = require('./userModel');
const UserProfile = require('./userProfileModel')

let createUserProfile = function (userID, email, phone, imagePath, name) {

    let newUserProfile = new UserProfile();
    newUserProfile._id = userID;
    newUserProfile.email = email;
    newUserProfile.phone = phone;
    newUserProfile.imagePath = imagePath;
    newUserProfile.name = name;
    newUserProfile.events = [];


    newUserProfile.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('save user profile success');
    });
};

let createDefaultProfile = function(userID, email){
    let newUserProfile = new UserProfile();
    newUserProfile._id = userID;
    newUserProfile.email = email;
    newUserProfile.phone = '';
    newUserProfile.imagePath = '';
    newUserProfile.name = '';
    newUserProfile.events = [];


    newUserProfile.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('save user profile success');
    });
}

// Create local user
let createLocalUser = function(email, password, profile, done) {
    // Crate a new user
    let newUser = new User();

    // Set local credentials
    newUser.email = email;
    newUser.local.password = newUser.generateHash(password);

    // Save the user
    newUser.save(function (err, user) {
        if (err) {
            throw err;
        }
        createUserProfile(user._id, email,
             profile.phone, profile.imagePath, profile.name);
        return done(null, newUser);
    });
};

// Create user with facebook account
let createFacebookUser = function(profile, token, done) {
    // Crate a new user
    let newUser = new User();
    console.log(profile);
    newUser.facebook.id = profile.id;
    newUser.facebook.token = token;
    if (profile.emails && profile.emails[0] && profile.emails[0].values) {
        newUser.email = profile.emails[0].value;
    } else {
        newUser.emails = profile.displayName;
    }

    // Save the user
    newUser.save(function (err, user) {
        if (err) {
            throw err;
        }
        createDefaultProfile(user._id, profile.emails[0].value);
        return done(null, newUser);
    });
};
// Create user with google account
let createGoogleUser = function(profile, token, done) {
    // Crate a new user
    let newUser = new User();

    newUser.google.id    = profile.id;
    newUser.google.token = token;
    newUser.email = profile.emails[0].value; // pull the first email

    // Save the user
    newUser.save(function (err, user) {
        if (err) {
            throw err;
        }
        createDefaultProfile(user._id, profile.emails[0].value);
        return done(null, newUser);
    });

};

// Export all user creation functions
module.exports = {
    createLocalUser : createLocalUser,
    createFacebookUser : createFacebookUser,
    createGoogleUser : createGoogleUser
};
