// Load dependencies
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// Define the schema for user model
let userSchema = mongoose.Schema({
    email: String,
    
    local: {
        password: String,
    },
    facebook: {
        id: String,
        token: String,
    },
    google: {
        id: String,
        token: String,
    }
});


// Methods to generate a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    console.log(this.local);
    if (!this.local.password){
        return false;
    }
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
