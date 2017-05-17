// Define the APIs for getting the paths of icons

const express = require('express');
const route = express.Router();
const icon = require('../lib/icon/iconService');

// Used to get the icon given the type of sport
route.get('/:sportType',function(req, res) {
    icon.getPath(req.params.sportType, function(err, data) {
        if (!err) {
            res.send(data[0].path);
        } else {
            console.log(err);
            res.end();
            return;
        }
    });
});


module.exports = route;
