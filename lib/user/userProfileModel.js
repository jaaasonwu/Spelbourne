// This file defines the structure of the user profile
// Load dependencies
const mongoose = require('mongoose');

let userProfile = mongoose.Schema({
    phone: String,
    imagePath: String,
    email: String,
    events: [String],
    name: String
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('UserProfile', userProfile);
