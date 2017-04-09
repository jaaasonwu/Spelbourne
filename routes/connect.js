const express = require('express');

module.exports = function (passport) {
    let route = express.Router();

    // Authorize (logged in, connect other social account)

    // Locally
    route.get('/local', function (req, res) {
        res.render('connect-local.ejs', {message: req.flash('loginMessage')});
    });
    route.post('/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // Facebook
    // Send to facebook to do the authentication
    route.get('/facebook', passport.authorize('facebook', {scope: 'email'}));

    // handle the callback after facebook has authorized the user
    route.get('/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // Google
    // send to google to do the authentication
    route.get('/google', passport.authorize('google', {scope: ['profile', 'email']}));

    // the callback after google has authorized the user
    route.get('/google/callback',
        passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
    return route;
};
