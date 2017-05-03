const express = require('express');
const route = express.Router();
const userProfileService = require('../lib/user/userProfileService.js');


route.get('/getUserProfile/:userID', function(req, res) {
    let userID = req.params.userID;
    userProfileService.getUser(userID, function (err, data) {
        if (err) {
            res.status(500).send("No such user");
            return;
        }
        res.send(data);
    });
});

module.exports = route;
