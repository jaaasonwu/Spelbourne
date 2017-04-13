const express = require('express');

module.exports = function (passport) {
    let route = express.Router();
    // Process the login form
    route.post('/login', function (req, res, next) {
        let authenticateStrategy = passport.authenticate('local-login', function (err, user, info) {
            // server error
            if (err) {
                console.log(err);
                return next(err);
            }
            // login failure
            if (!user) {
                res.status(401).send({success: false, msg: req.flash('loginMessage')});
            } else {
                // establish login session
                req.logIn(user, function (err) {
                    res.status(200).send({success: true})
                });
            }
        });

        authenticateStrategy(req, res, next);
    });

    // Process the signup form
    route.post('/signup', function (req, res, next) {
        let signupStrategy = passport.authenticate('local-signup', function (err, user, info) {
            // server error
            if (err) {
                console.log(err);
                return next(err);
            }
            // signup failure
            if (!user) {
                res.status(401).send({success: false, msg: req.flash('signupMessage')});
            } else {
                // establish login session
                req.logIn(user, function (err) {
                    res.status(200).send({success: true})
                });
            }
        });
        signupStrategy(req, res, next);
    });


    route.get('/admin', function (req, res) {
        if (req.isAuthenticated()) {
            res.send({loggedIn: true, user: req.user});
        } else {
            res.send({loggedIn: false});
        }
    });

    // Facebook routes
    // route for facebook authentication and login
    route.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));

    route.get('/facebook/callback', function (req, res, next) {
        let facebookStrategy = passport.authenticate('facebook', function (err, user, info) {
            if (err) {
                console.log(err);
                return next(err);
            }
            // authentication failure
            if (!user) {
                res.redirect('/login');
            } else {
                // establish login session
                req.logIn(user, function (err) {
                    res.redirect('/');
                });
            }
        });
        facebookStrategy(req, res, next);
    });

    // Google routes
    route.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    route.get('/google/callback', function (req, res, next) {
        let googleStrategy = passport.authenticate('google', function (err, user, info) {
            if (err) {
                console.log(err);
                return next(err);
            }
            // authentication failure
            if (!user) {
                res.redirect('/login');
            } else {
                // establish login session
                req.logIn(user, function (err) {
                    res.redirect('/');
                });
            }
        });
        googleStrategy(req, res, next);
    });

    // Logout page
    route.get('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    return route;
};