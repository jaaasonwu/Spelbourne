const express = require('express');
const route = express.Router();
const eventService = require('../lib/events/eventService.js');

route.post('/createEvent', function(req, res) {
    let event = req.body;
    eventService.createEvent(event.location, event.organizerID, event.participants, event.description,
        event.createEventDate, event.eventDate, event.endDate, event.visibility);

    res.end();
});

route.get('/getEvent/:eventID', function(req, res) {
    let eventID = req.params.eventID;
    eventService.getEvent(eventID, function (err, data) {
        if (err) {
            res.status(500).send("No such event");
            return;
        }
        res.send(data);
    });
});

module.exports = route;
