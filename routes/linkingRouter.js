const express = require('express');
const route = express.Router();

// Unlink accounts
// local -----------------------------------
route.get('/unlink/local', function(req, res) {
    let user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});

// facebook -------------------------------
route.get('/unlink/facebook', function(req, res) {
    let user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});

// google ---------------------------------
route.get('/unlink/google', function(req, res) {
    let user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});

module.exports = route;