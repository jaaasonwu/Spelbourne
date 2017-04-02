/**
 * Created by zhai7 on 3/13/2017.
 */
module.exports = function (app, passport) {
    // Home page
    app.get('/',function(req,res){
        res.render('index.ejs');
    });
    app.get('/:page', function (req, res) {
        res.render('index.ejs');
    });

    // Process the login form

    app.post('/login', function(req,res,next){
       passport.authenticate('local-login',function(err, user, info){
           // server error
           if (err){
               console.log(err);
               return next(err);
           }
           // login failure
           if (!user){
               res.status(401).send({success: false, msg: req.flash('loginMessage')});
           }else{
               // establish login session
               req.logIn(user,function(err){
                  res.status(200).send({success: true})
               });
           }
       })(req,res,next);
    });

    // Process the signup form
    app.post('/signup', function(req,res,next){
        passport.authenticate('local-signup',function(err, user, info){
            // server error
            if (err){
                console.log(err);
                return next(err);
            }
            // signup failure
            if (!user){
                res.status(401).send({success: false, msg: req.flash('signupMessage')});
            }else{
                // establish login session
                req.logIn(user,function(err){
                    res.status(200).send({success: true})
                });
            }
        })(req,res,next);
    });


    // Profile page
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/auth/admin',function(req,res){
       if (req.isAuthenticated()){
           res.send({loggedIn : true, user : req.user});
       } else {
           res.send({loggedIn : false});
       }
    });

    // Facebook routes
    // route for facebook authentication and login
    app.get('/auth/facebook',passport.authenticate('facebook',{ scope: 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook',{
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

    // Google routes
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    // Authorize (logged in, connect other social account)

    // Locally
    app.get('/connect/local', function(req, res){
       res.render('connect-local.ejs',{message: req.flash('loginMessage')});
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // Facebook
    // Send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email'}));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // Google
    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // Unlink accounts
    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        let user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        let user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        let user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // Logout page
    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.end();
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
