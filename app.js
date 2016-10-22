"use strict";

/** Imports */
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const config = require("./webapp/config.json");
const port = config && config.defaultPort || 3000;


let _wsServerStarted = false;

/**
 * Starts server listening on port.
 * @param {number} port - from config.json or default value.
 */
server.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});

let routes = require('./routes/index.js')(io);
app.use('/', routes);

// This sets up the location of the static files to serve
app.use(express.static('resources'));