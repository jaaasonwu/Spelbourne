const Event = require('./eventModel.js');
const userProfileService = require('../user/userProfileService.js');

var ObjectId = require('mongodb').ObjectID;

let createEvent = function (location, locationId, description, startDate,
        organizerID, createEventDate, startTime, duration, visibility, sportType,
        skillLevel) {
    event = new Event();
    event.location = location;
    event.locationId = locationId;
    event.description = description;
    event.startDate = startDate;
    event.organizerID = organizerID;
    event.skillLevel = skillLevel;
    event.createEventDate = createEventDate;
    event.startTime = startTime;
    event.duration = duration;
    event.visibility = visibility;
    event.sportType = sportType;
    event.skillLevel = skillLevel;

    // Save the user
    event.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            userProfileService.addEventToUser(
                organizerID,
                event._id,
                function (err) {
                    if (err) {
                        event.remove();
                    }
                }
            );
            console.log("Save the event");
        }
    });
};

let joinEvent = function (eventID, userID, callback) {
    Event.findById(eventID, function (err, data) {
        if (!err) {
            // Check if user already joined the event
            if (data.organizerID == userID ||
                    data.participants.indexOf(userID) != -1) {
                callback("You already joined the event")
            } else {
                userProfileService.addContact(userID,data.organizerID,callback);
                data.participants.push(userID);
                data.save(function (err) {
                    callback(err);
                });
            }

        } else {
            callback(err);
        }
    });
};

let getEvent = function (eventID, callback) {
    Event.findById(eventID, callback);
};

let getEventList = function (callback) {
    Event.find(callback);
};
let getMyOrganizedEvents = function(userID, callback){
    Event.find({organizerID: userID},callback);
};
let getMySubscribedEvents = function(userID,callback){
    userProfileService.getUser(userID,function(err,data){
        if(!err){
            console.log('logging from mongoose');
            console.log(data);
            Event.find({_id:{$in : data.events}},callback);
        }
        else{
            callback(err);
        }

    });
};

module.exports = {
    createEvent: createEvent,
    getEvent: getEvent,
    getEventList: getEventList,
    joinEvent: joinEvent,
    getMyOrganizedEvents: getMyOrganizedEvents,
    getMySubscribedEvents: getMySubscribedEvents
};
