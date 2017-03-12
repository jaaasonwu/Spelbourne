// Requre usefule modules
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const GoogleAuth = require('google-auth-library');
const CLIENT_ID = '523892883118-akcfr1q4mg78ffrfttcil34emeuqkpd5.apps.googleusercontent.com'

// Defaul port to 8888 or use env PORT
const PORT = process.env.PORT || 8888;

const auth = new GoogleAuth;
const client = new auth.OAuth2(CLIENT_ID, '', '')

// Create express app
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use view as static folder
app.use(express.static(path.join(__dirname,'views')));

// Start the server
app.listen(PORT, function() {
    console.log("server started at port:", PORT);
});

app.post('/tokensignin', function(req, res) {
    let token = req.body.idtoken;
    client.verifyIdToken(
        token,
        CLIENT_ID,
        function(err, login) {
            if (err) {
                console.log(err);
                res.end();
                return;
            }

            let payload = login.getPayload();
            let userid = payload['sub'];
            let username = payload['name'];
            let email = payload['email'];
            res.send({
                userid: userid,
                username: username,
                email: email
            });
        }
    );
});
