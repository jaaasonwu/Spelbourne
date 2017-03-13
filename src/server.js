// Require useful modules
const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const path         = require('path');
const logger       = require('morgan');
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');

// local file requirement
const db = require('./lib/db.js');
const routes = require('./routes/routes.js');
const ppConfig = require('./lib/passport.js');

// Default port to 8888 or use env PORT
const port = process.env.PORT || 8888;

// const GoogleAuth = require('google-auth-library');
// const CLIENT_ID = '523892883118-akcfr1q4mg78ffrfttcil34emeuqkpd5.apps.googleusercontent.com';
// const auth = new GoogleAuth;
// const client = new auth.OAuth2(CLIENT_ID, '', '')

// connect to DB
mongoose.connect(db.url);

// Create express app
let app = express();

// config passport
ppConfig(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// using ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// passport initialization
app.use(session({ secret: 'teamtamisthebestteamforever'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); // use connect-flash for flash message

// routes
routes(app,passport);


// Use view as static folder
app.use(express.static(path.join(__dirname, 'views')));

// Start the server
app.listen(port, function () {
    console.log("server started at port:", port);
});

