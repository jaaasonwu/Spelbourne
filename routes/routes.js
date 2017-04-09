const auth = require('./auth.js');
const connect = require('./connect.js');
const unlink = require('./unlink.js');
const index = require('./index.js');
const event = require('./event.js');
const user = require('./user.js');

module.exports = function (app, passport) {
    app.use('/',index);
    app.use('/user',user);
    app.use('/auth',auth(passport));
    app.use('/connect',connect(passport));
    app.use('/unlink',unlink);
    app.use('/event',event);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');

}
