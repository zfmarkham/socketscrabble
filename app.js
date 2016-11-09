"use strict";

/** Imports */
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// Setup template render engine
app.set('views', './views/');
app.set('view engine', 'pug');

// Set app to use bodyParser, this adds a body property to the request param in route callbacks.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(require('express-session')({                        //
    secret: 'keyboard cat', // What's this for??            //
    resave: false,                                          //  Order of this is important.
    saveUninitialized: false                                //  If the app.use('/', routes) is before the passport stuff
}));                                                        //  then passport throws an error saying passport.initialize isn't used
app.use(passport.initialize());                             //
app.use(passport.session());                                //

// Using the flash middleware provided by connect-flash to store messages in session and displaying in templates
// This basically adds a .flash property to requests in routes. This is used in passport to flash a message when authenticating
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

const routes = require('./routes/index')(io, passport);
app.use('/', routes);

// This sets up the location of the static files to serve
app.use(express.static('.'));


mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

const config = require("./webapp/config.json");
const port = config && config.defaultPort || 3000;

/**
 * Starts server listening on port.
 * @param {number} port - from config.json or default value.
 */
server.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});
