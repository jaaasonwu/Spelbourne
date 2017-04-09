const Event = require('./eventModel.js');

let createEvent = function (location, organizerID, participants, description,
        createEventDate, eventDate, endDate, visibility) {
    event = new Event();
    event.location = location;
    event.organizerID = organizerID;
    event.participants = participants;
    event.description = description;
    event.createEventDate = createEventDate;
    event.eventDate = eventDate;
    event.endDate = endDate;
    event.visibility = visibility;

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

// Exports all strategies
module.exports = {
    createEvent: createEvent
};
