"use strict";

//imports
const io = require("socket.io");


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
const _roomDataLookUp = {};

/**
 * @PlaceHolder - do this with active games?
 * Map of existing rooms & active users 
 * @private
 * @key roomId
 * @value array of user ids
 */
const _roomUserLookUp = {};

/**
 * @Placeholder - required DB.
 * Used to ensure next room id is unique.
 * @private
 */
let _nextRoomId = 1;


/**
 * Initialises sockets.io and registers event handlers.  
 * Requires HTTP Request server to upgrade clients to ws-protcol. 
 * @param {httpServer}
 */
const init = function (httpServer) {
    _wsServer = io.listen(httpServer);

    _wsServer.on("connection", function (socket) {

        socket.on("disconnect", _onDisconnectHandler);
        socket.on("newGame", _onNewGameHandler);
        socket.on("joinGame", _onJoinGameHandler);

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
    const roomId = socket.rooms[0];
    socket.to(roomId).emit("playerLeft", ""); //@TODO user data.
    socket.leave(roomId);

    //remove activeSocket.
    const index = _activeSockets.indexOf(socket);
    if (index !== -1) _activeSockets.splice(index, 1);
};

/**
 * Creates a new ws-room.
 * @private
 */
const _onNewGameHandler = function () {
    console.log("newGame handler fired.");

    const roomId = _createNewRoom(socket.id)
    socket.join(roomId);

    //Socket on client side should have a reference to its new room id.
    socket.broadcast.emit("newGame");

}

/**
 * @Placeholder (?)
 * 
 * @param {json} hopefully contains roomId
 */
const _onJoinGameHandler = function (data) {
    let gameData;
    let roomJoined = false;
    const userId = socket.id;
    const roomId = data && data.roomId || null;

    if (userId && roomId && roomId in _roomDataLookUp && roomId in _roomUserLookUp) {
        _roomUserLookUp[roomId].push(userId);
        gameData = _roomDataLookUp[roomId];
        socket.join(roomId);
        roomJoined = true;
    }

    if (!roomJoined) {
        //@TODO need error handling. 
        socket.emit("joinFailed");

    } else {
        //Send existing data back to newly joined client.
        socket.emit("joinSuccess", gameData);
        //inform other users new player has joined.
        socket.broadcast.to(roomId).emit("newPlayer"); //@TODO send user data to other clients.
    }
};

/**
 * @Placeholder
 * Creates a new room entry and incremments the nextId;
 * @private
 * @param {number} user Id of the player creating the room.
 * @returns {number} room Id
 */
const _createNewRoom = function (userId) {
    const roomId = _nextRoomId;

    _roomDataLookUp[roomId] = {};
    _roomUserLookUp[roomId] = [userId];

    _nextRoomId++;
    return roomId;
}


/**
 * Public API
 */
exports.init = init;