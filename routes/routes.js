const auth = require('./authRouter.js');
const connect = require('./connectRouter.js');
const unlink = require('./linkingRouter.js');
const index = require('./pageRouter.js');
const event = require('./eventRouter.js');
const user = require('./userRouter.js');
const icon = require('./iconRouter.js');

module.exports = function (app, passport) {
    app.use('/user', user);
    app.use('/auth', auth(passport));
    app.use('/connect', connect(passport));
    app.use('/unlink', unlink);
    app.use('/event', event);
    app.use('/icon', icon);
    app.use('/', index);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    let errMsg = {"Error": true};
    res.json(errMsg);

}
