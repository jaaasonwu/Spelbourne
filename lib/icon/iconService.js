const Icon = require('./iconModel.js');

let getPath = function(name, callback) {
    Icon.find({name: name}, callback);
}