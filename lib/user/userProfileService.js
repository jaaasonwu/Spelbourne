// This is the database service for getting the profile of the user and for
// user join event.
const UserProfile = require('./userProfileModel.js');
var ObjectId = require('mongodb').ObjectID;

let getUser = function (userID, callback) {
    UserProfile.findById(userID, callback);
};

let addEventToUser = function (userID, eventID, callback) {
    UserProfile.findById(userID, function (err, data) {
        if (!err) {
            console.log(data);
            data.events.push(eventID);
            data.save(function (err) {
                callback(err);
            });
        } else {
            callback(err);
        }
    });
};

let updateProfile = function(userID, updatedProfile, callback) {
    UserProfile.update({_id: userID}, increment, function (err, raw) {
        callback(err);
    });
    UserProfile.findById(userID, function(err, data) {
        if (!err) {
            data.name = updatedProfile.name;
            data.imagePath = updatedProfile.imagePath;
            data.phone = updatedProfile.phone;
            data.interests = updated.interests;
            data.save(function (err) {
                callback(err);
            });
        } else {
            callback(err);
        }
    });
};

module.exports = {
    getUser: getUser,
    addEventToUser: addEventToUser,
    updateProfile: updateProfile
};
