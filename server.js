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

// Local file requirement
const db = require('./lib/db.js');
const routes = require('./routes/routes.js');
const ppConfig = require('./lib/auth/passport.js');

// Default port to 8888 or use env PORT
const port = process.env.PORT || 8888;

// Connect to DB
mongoose.connect(db.url);

// Create express app
let app = express();

// Config passport
ppConfig(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Using ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// Passport initialization
app.use(session({ secret: 'teamtamisthebestteamforever'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); // use connect-flash for flash message

// Use view as static folder
app.use(express.static(path.join(__dirname, 'views')));

// Routes
routes(app, passport);



// Start the server
app.listen(port, function () {
    console.log("server started at port:", port);
});
