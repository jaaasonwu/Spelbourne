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

let updateUserProfile = function(userID,name, phoneNumber,imagePath,callback) {
    UserProfile.findById(userID, function (err, data) {
        if (!err) {
            console.log(data);
            data.name = name;
            data.phone = phoneNumber;
            data.imagePath = imagePath;
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
    updateUserProfile: updateUserProfile
};
