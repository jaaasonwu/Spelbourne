const express = require('express');
const route = express.Router();
const eventService = require('../lib/events/eventService.js');

route.post('/createEvent', function(req, res) {
    if (req.isAuthenticated()) {
        let e = req.body;
        organizerID = req.user._id;
        createEventDate = new Date(e.createEventDate);
        startTime = new Date(e.createEventDate);
        startDate = new Date(e.startDate);
        duration = new Date(e.duration);
        eventService.createEvent(e.location, e.description, startDate,
                organizerID, createEventDate, startTime, duration, e.visibility, e.sportType);
        res.end();
    };
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
