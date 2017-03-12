// Requre usefule modules
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

// Defaul port to 8888 or use env PORT
const PORT = process.env.PORT || 8888;

// Create express app
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use view as static folder
app.use(express.static(path.join(__dirname,'view')));

// Start the server
app.listen(PORT, function() {
    console.log("server started at port:", PORT);
});
