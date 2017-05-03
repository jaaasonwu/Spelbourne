const express = require('express');
const route = express.Router();
const eventService = require('../lib/events/eventService.js');
//const userProfileService = require('../lib/user/userProfileService.js');

route.get('/profile/:userID', function(req, res) {
    let userID = req.params.userID;
    console.log('logging userID');
    console.log(userID);
    //add a logged in check
    if((userID == 'my_profile')){
        //viewing your own profile
        userID = req.user._id;
        eventService.getMySubscribedEvents(userID, function (err, data) {
            if(err) {
                res.status(500).send("No such user");
                return;
            }
            res.send(data);

        });

    }
    //viewing someone else's profile
    else{
        console.log("getting my subscribed events");

        eventService.getMyOrganizedEvents(userID, function (err, data) {
            if(err) {
                res.status(500).send("No such user");
                return;
            }
            res.send(data);

        });


    }

});

module.exports = route;
