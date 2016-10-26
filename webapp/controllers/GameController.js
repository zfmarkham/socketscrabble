"use strict";

//imports
const Game = require("../dto/Game");


/**
 * websockets server instance
 * @private
 */
let _wsServer = null;

/**
 * 
 */
const _activeSockets = [];

/**
 * @Placeholder - do this with active games?
 * Map of existing rooms & data
 * @private
 * @key roomId
 * @value gameData
 */
const _games = {};

/**
 * @Placeholder - required DB.
 * Used to ensure next room id is unique.
 * @private
 */
let _nextGameId = 1;


/**
 * Initialises sockets.io and registers event handlers.  
 * Requires HTTP Request server to upgrade clients to ws-protcol. 
 * @param {httpServer}
 */
const init = function (io) {
    //_wsServer = io.listen(httpServer);
    io.on('connection', function (socket) {

        socket.on("disconnect", _onDisconnectHandler);
        socket.on("newGame", _onNewGameHandler);
        socket.on("joinGame", _onJoinGameHandler);
        socket.on('letterPlaced', function(data){
            socket.broadcast.emit('letterPlaced', data);
        });
        
        _activeSockets.push(socket);
    });
};

/**
 * Handles disconnect events fired by client.
 * @TODO look at how the rooms are managed if not active users in room. 
 * @private
 */
const _onDisconnectHandler = function (data) {
    console.log("disconnect fired.");

    //Leave the room/game instance
    //const roomId = socket.rooms[0];
    //socket.to(roomId).emit("playerLeft", ""); //@TODO user data.
    //socket.leave(roomId);

    //remove activeSocket.
    // const index = _activeSockets.indexOf(socket);
    // if (index !== -1) _activeSockets.splice(index, 1);
};

/**
 * Creates a new ws-room.
 * @private
 */
const _onNewGameHandler = function () {
    console.log("newGame handler fired.");

    const roomId = _createNewGame(socket.id)
    socket.join(roomId);

    //Socket on client side should have a reference to its new room id.
    socket.broadcast.emit("newGame");

};;

/**
 * @Placeholder (?)
 * 
 * @param {json} data - hopefully contains roomId
 */
const _onJoinGameHandler = function (data) {
    const userId = socket.id;
    const gameId = data && data.gameId || null;
    let game = null;

    if (!userId || !gameId || !(gameId in _games)) {
        //@TODO need error handling. 
        socket.emit("joinFailed");
        return;
    }

    game = _games[gameId];
    game.addNewPlayer(userId);

    //join game room.    
    socket.join(gameId);
    //Send existing data back to newly joined client.
    socket.emit("joinSuccess", game);
    //inform other users new player has joined.
    socket.broadcast.to(roomId).emit("newPlayer"); //@TODO send user data to other clients.
};

/**
 * @Placeholder
 * Creates a new room entry and incremments the nextId;
 * @private
 * @param {number} user Id of the player creating the room.
 * @returns {number} room Id
 */
const _createNewGame = function (userId) {
    const game  = new Game(_nextGameId);

    _nextGameId++;

    game.addNewPlayer(userId);
    
    return game;
}


/**
 * Public API
 */
exports.init = init;