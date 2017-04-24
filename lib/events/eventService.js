const Event = require('./eventModel.js');
//const ObjectID = require('mongodb').ObjectID;
var ObjectId = require('mongodb').ObjectID;

// const mongoose = require('mongoose');

let createEvent = function (location, description, startDate,
        organizerID, skillLevel, createEventDate, startTime, duration, visibility, sportType) {
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

let getEvent = function (eventID, callback) {
    data = Event.findById(eventID, callback);
};

// Exports all strategies
module.exports = {
    createEvent: createEvent,
    getEvent: getEvent
};
