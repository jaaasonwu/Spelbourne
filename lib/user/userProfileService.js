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
/*postcode, interests*/
let updateProfile = function(userID,increment,callback) {
    UserProfile.update({_id: userID}, increment, function (err, raw) {
        callback(err);
    });
    console.log("updating profile");
    UserProfile.findById(userID,function(err,data){
        if (!err) {
            data.name = increment.name;
            data.imagePath = increment.imagePath;
            data.phone = increment.phone;
            data.postCode = increment.postCode;
            combined = data.interests.push(...increment.interests);
            len = data.in
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
    removeEventFromUser: removeEventFromUser,
    updateProfile: updateProfile
};
