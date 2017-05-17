const express = require('express');
const route = express.Router();
// Import the services of the database
const eventService = require('../lib/events/eventService.js');

route.post('/createEvent', function(req, res) {
    // Check if the user is logged in
    if (req.isAuthenticated()) {
        let e = req.body;
        console.log(e);
        organizerID = req.user._id;
        createEventDate = new Date();
        startDate = new Date(e.startDate);

        eventService.createEvent(e.location, e.locationId, e.description, startDate,
                organizerID, createEventDate, e.duration, e.visibility, e.sportType
                , e.skillLevel, e.maxParticipant);
        res.json({success: true});
    } else {
        // 401 means unauthorized
        res.status(401).json({success: false, msg: '401'});
    }
});

route.post('/joinEvent', function(req, res) {
    // Check if the user is logged in
    if (req.isAuthenticated()) {
        let e = req.body;
        let eventID = e.eventID;
        console.log(eventID);
        userID = req.user._id;
        eventService.joinEvent(eventID, userID, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.end();
            }
        });

    } else {
        res.status(401).end();
    }
});

route.get('/deleteEvent/:eventID',function(req,res){
    let eventID = req.params.eventID;
    if (req.isAuthenticated()){
        eventService.deleteEvent(eventID, function (err) {
            if (err) {

                res.status(500).send(err);
                return;
            }
            res.end();
        });
    }
    else{
        res.status(401).json({success: false, msg: '401'});
    }

});

// Get a single event by id
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

// Get all the events (must be public events in the future and can have a limit
// on the number of events returned)
route.get('/getEventList', function(req, res) {
    eventService.getEventList(function (err, data) {
        if (!err) {
            let currTime= new Date();
            let result = [];
            let numEvents = req.query['numEvents'];

            // For every event from the server, check it's in the future and
            // check that it's public
            for (let i = 0; i < data.length; i++) {
                if (data[i].startDate > currTime && data[i].visibility == 'Public') {
                    result.push(data[i]);
                }
                // if reach the limit on number, send it directly
                if (numEvents != undefined) {
                    if (result.length >= numEvents) {
                        res.send(result);
                        return;
                    }
                }
            }
            res.send(result);
        } else {
            res.status(500).send("No such event");
        }
    });
});

module.exports = route;
