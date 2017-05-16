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

let removeEventFromUser = function(userID, eventID, callback) {
    UserProfile.findById(userID, function (err, data) {
        if (!err) {

            var index = data.events.indexOf(eventID);
            if (index > -1) {
                data.events.splice(index, 1);
            }
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
    removeEventFromUser: removeEventFromUser
};
