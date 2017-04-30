// Load dependencies
const mongoose = require('mongoose');

// Define the schema for user model
let userSchema = mongoose.Schema({
    name: String,
    path: String
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('Icon', iconSchema);