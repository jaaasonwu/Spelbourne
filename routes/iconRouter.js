const express = require('express');
const route = express.Router();

// Used to get the icon given the type of sport
route.get('/:sportType',function(req, res) {
    let iconMap = [
        {'name': 'Tennis', 'path': 'images/sportsicon/tennisball.svg'},
        {'name': 'Basketball', 'path': 'images/sportsicon/basketball.svg'},
        {'name': 'Soccer', 'path': 'images/sportsicon/football.svg'},
        {'name': 'Golf', 'path': 'images/sportsicon/golf.svg'},
        {'name': 'Running', 'path': 'images/sportsicon/running.svg'},
        {'name': 'Swimming', 'path': 'images/sportsicon/swimming.svg'},
    ];
    iconMap.forEach(function(sport) {
        if (sport.name == req.params.sportType) {
            res.send(sport.path);
        }
    })
});


module.exports = route;