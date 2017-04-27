const Event = require('./eventModel.js');
//const ObjectID = require('mongodb').ObjectID;
var ObjectId = require('mongodb').ObjectID;

// const mongoose = require('mongoose');


let createEvent = function (location, description, startDate,
        organizerID, createEventDate, startTime, duration, visibility, sportType,
        skillLevel) {
    event = new Event();
    event.location = location;
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
            return;
            // throw err;
        }
        console.log("Save the event");
    });
};

let joinEvent = function (eventID, userID, callback) {
    Event.findById(eventID, function (err, data) {
        if (!err) {
            data.participants.push(userID);
            data.save(function (err) {
                callback(err);
            });
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

// Exports all strategies
module.exports = {
    createEvent: createEvent,
    getEvent: getEvent,
    getEventList: getEventList,
    joinEvent: joinEvent
};
