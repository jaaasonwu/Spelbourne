const Icon = require('./iconModel.js');

// The default data for icon
let iconMap = [
    {'name': 'Tennis', 'path': 'images/sportsicon/tennisball.svg'},
    {'name': 'Basketball', 'path': 'images/sportsicon/basketball.svg'},
    {'name': 'Soccer', 'path': 'images/sportsicon/football.svg'},
    {'name': 'Golf', 'path': 'images/sportsicon/golf.svg'},
    {'name': 'Running', 'path': 'images/sportsicon/running.svg'},
    {'name': 'Swimming', 'path': 'images/sportsicon/swimming.svg'},
];

//Store the icon data to the database
iconMap.forEach(function(record) {
    let icon = new Icon()
    icon.name = record.name;
    icon.path = record.path;
    Icon.find({name: record.name}, function(err, result) {
        //Check if the icon already exists
        if (!result[0]){
            icon.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
            })
        }
    })
})

// Used to get the path using the name
let getPath = function(name, callback) {
    Icon.find({name: name}, callback);
}

module.exports = {getPath: getPath};