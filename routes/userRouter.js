// Defines the APIs to get user profile
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
route.post('/updateUserProfile/', function(req, res) {
    if (req.isAuthenticated()) {
        let e = req.body;

        // Only allow user to modify the following field
        const increment = {
            name: e[0].name,
            imagePath: e[0].imagePath,
            phone: e[0].phone,
            postCode: e[0].postCode,
            interests: e[0].interests

        };

        userProfileService.updateProfile(e[0]._id, increment, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.end();
            }
        });

    } else {
        // 401 means unauthorized
        res.status(401).json({success: false, msg: '401'});
    }
});
module.exports = route;
