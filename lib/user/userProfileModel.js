// Load dependencies
const mongoose = require('mongoose');

let userProfile = mongoose.Schema({
    userID: String,
    phone: String,
    imagePath: String,
    email: String,
    name: String
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('UserProfile', userProfile);
