"use strict";

/** Imports */
const http = require("http");
const controller = require("httpdispatcher");
const gameController = require("./webapp/controllers/GameController");
const config = require("./webapp/config.json");


const port = config && config.defaultPort || 3000;


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

    } finally {
        response.end();
    }
});

/**
 * Starts server listening on port.
 * @param {number} port - from config.json or default value. 
 */
server.listen(port, function () {
    console.log(`Server is listening on port: ${port}`);
});


/**
 * Default endpoint, serves static index & resources.
 * @param {URL}
 * @param {HTTP handler}
 */
controller.onGet("/play", function (request, response) {
    if(! _wsServerStarted){
        gameController.init(server);
    }
});


/**
 * @param {URL}
 * @param {HTTP handler}
 */
controller.onGet("/menu", function (request, response) {
    response.writeHead(200, { contentType: "text/plain" });
    response.end("world");
});