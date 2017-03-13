/**
 * Created by zhai7 on 3/13/2017.
 */
module.exports = function (app, passport) {
    // Home page
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // Login page
    app.get('/login', function (req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // Process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Sign up page, show sign up form
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // Process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure
        failureRedirect: '/signup', // redirect back to the sign up
        failureFlash: true // allow flash messages
    }));

    // Profile page
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // Logout page
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');

}