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

const config = require("./webapp/config.json");
const port = config && config.defaultPort || 3000;

// TODO instead of using config.json use an environment variable

/**
 * Starts server listening on port.
 * @param {number} port - from config.json or default value.
 */
server.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});

// Setup template render engine
app.set('views', './views/');
app.set('view engine', 'pug');

// Set app to use bodyParser, this adds a body property to the request param in route callbacks.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var expressSession = require('express-session');
var sessionMiddleware = expressSession({
    name: 'insert_name_here_probs',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new (require("connect-mongo")(expressSession))({
        url: "mongodb://localhost/sessionStore",
        ttl: 5 * 60 // Session timeout, not sure how long this realistically wants to be, currently 5 minutes
    })
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

io.use(function(socket, next){
    sessionMiddleware(socket.request, {}, next);
});

const Game = require('./models/game').Game;
io.on('connection', function (socket) {

    socket.on('getGameInfo', ()=> {
        socket.emit('getGameInfo', socket.request.session.game);
    });

    socket.on('letterPlaced', (data) => {
        socket.broadcast.emit('letterPlaced', data);
    })
});


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