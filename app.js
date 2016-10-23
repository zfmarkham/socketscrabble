"use strict";

/** Imports */
<<<<<<< HEAD
const http = require("http");
const controller = require("httpdispatcher");
const gameController = require("./webapp/controllers/GameController");
const config = require("./webapp/config.json");
const nodeStatic =  require("node-static");

const fileServer = new nodeStatic.Server("./test/");
=======
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
>>>>>>> origin/master

const config = require("./webapp/config.json");
const port = config && config.defaultPort || 3000;

<<<<<<< HEAD

let _wsServerStarted = false;


/**
 * Server instance.  Delegates URL handling to http dispatcher;
 * @param {function} Default handler.
 */
const server = http.createServer(function (request, response) {
    try {
        console.log("request made");
        controller.dispatch(request, response);

    } catch (error) {
        console.error(error);
        response.writeHead(500);
        response.end();
    }
});

=======
>>>>>>> origin/master
/**
 * Starts server listening on port.
 * @param {number} port - from config.json or default value.
 */
server.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});

let routes = require('./routes/index.js')(io);
app.use('/', routes);

<<<<<<< HEAD
/**
 * Default endpoint, serves static index & resources.
 * @param {URL}
 * @param {HTTP handler}
 */
controller.onGet("/play", function (request, response) {
    if (!_wsServerStarted) {
        gameController.init(server);
    }

    response.end();
});


/**
 * @param {URL}
 * @param {HTTP handler}
 */
controller.onGet("/menu", function (request, response) {
    response.writeHead(200, { contentType: "text/plain" });
    response.end("world");
});
=======
// This sets up the location of the static files to serve
app.use(express.static('.'));
>>>>>>> origin/master
