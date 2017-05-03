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

let addContact = function(userID, contactID,callback){
    UserProfile.findById(userID, function (err, data) {
        if (!err) {
            // Check if user already joined the event
            if (data.contacts.indexOf(userID) != -1) {
                callback("contact already in list")
            } else {
                data.contacts.push(userID);
                data.save(function (err) {
                    callback(err);
                });
            }

        } else {
            callback(err);
        }
    });
    /*UserProfile.update(
        { _id: userID },
        { $push: { contacts: contactID } },
        {upsert : true}, callback
    );*/
};


module.exports = {
    getUser: getUser,
    addEventToUser: addEventToUser,
    addContact : addContact
};
