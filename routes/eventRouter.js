const express = require('express');
const route = express.Router();
const eventService = require('../lib/events/eventService.js');

route.post('/createEvent', function(req, res) {
    let event = req.body;

    eventService.createEvent(event.location, event.organizerID, event.participants, event.description,
        event.createEventDate, event.eventDate, event.endDate, event.visibility);
    res.end();
});

module.exports = route;
