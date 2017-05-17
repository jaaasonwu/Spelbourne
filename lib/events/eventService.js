const Event = require('./eventModel.js');
const userProfileService = require('../user/userProfileService.js');

var ObjectId = require('mongodb').ObjectID;

let createEvent = function (location, locationId, description, startDate,
        organizerID, createEventDate, duration, visibility, sportType,
        skillLevel, maxParticipant) {
    event = new Event();
    event.location = location;
    event.locationId = locationId;
    event.description = description;
    event.startDate = startDate;
    event.organizerID = organizerID;
    event.skillLevel = skillLevel;
    event.createEventDate = createEventDate;
    event.duration = duration;
    event.visibility = visibility;
    event.sportType = sportType;
    event.skillLevel = skillLevel;
    event.maxParticipant = maxParticipant;

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
                data.participants.push(userID);
                data.save(function (err) {
                    if (!err) {
                        userProfileService.addEventToUser(
                            userID,
                            eventID,
                            function (err) {
                                callback(err);
                            }
                        );
                    } else {
                        callback(err);
                    }
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
let deleteEvent = function (eventID, callback) {
    Event.findById(eventID,function(err,data){
        if(!err){
            var participants = data.participants;
            var organizer = data.organizerID;
            participants.forEach(function(user){
                userProfileService.removeEventFromUser(user,eventID,callback);
            });
            userProfileService.removeEventFromUser(organizer,eventID,callback);
            data.remove();
        }
        else{
            callback(err);
        }


    });
}
module.exports = {
    createEvent: createEvent,
    getEvent: getEvent,
    getEventList: getEventList,
    joinEvent: joinEvent,
    deleteEvent: deleteEvent
};
