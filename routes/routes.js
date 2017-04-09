const auth = require('./authRouter.js');
const connect = require('./connectRouter.js');
const unlink = require('./linkingRouter.js');
const index = require('./pageRouter.js');
const event = require('./eventRouter.js');
const user = require('./userRouter.js');

module.exports = function (app, passport) {
    app.use('/', index);
    app.use('/user', user);
    app.use('/auth', auth(passport));
    app.use('/connect', connect(passport));
    app.use('/unlink', unlink);
    app.use('/event', event);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');

}
