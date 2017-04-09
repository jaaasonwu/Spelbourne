const express = require('express');
const route = express.Router();

// Home page
route.get('/',function(req, res) {
    res.render('index.ejs');
});

route.get('/:page', function (req, res) {
    res.render('index.ejs');
});

module.exports = route;