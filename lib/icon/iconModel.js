// Load dependencies
const mongoose = require('mongoose');

// Define the schema for icon model
let iconSchema = mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Icon', iconSchema);