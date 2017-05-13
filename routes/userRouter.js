const express = require('express');
const route = express.Router();
const userProfileService = require('../lib/user/userProfileService.js');


route.get('/getUserProfile/:userID', function(req, res) {
    let userID = req.params.userID;
    console.log(req.toString());
    userProfileService.getUser(userID, function (err, data) {
        if (err) {
            res.status(500).send("No such user");
            return;
        }
        res.send(data);
    });
});
route.post('/updateProfile', function(req, res) {
    if (req.isAuthenticated()) {
        let e = req.body;
        userID = req.user._id;
        data = req.body;
        userProfileService.updateUserProfile(userID,data.name,data.phoneNumber,data.img, function(err){
            if(err){
                res.status(500).send("Update error");
            }
            else {
                res.end();
            }

        });
    } else {
        // 401 means unauthorized
        res.status(401).json({success: false, msg: '401'});
    }
});

module.exports = route;
