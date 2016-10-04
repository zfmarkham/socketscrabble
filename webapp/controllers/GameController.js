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
    this._wsServer = io.listen(httpServer);

    this._wsServer.on("connection", function (socket) {

        socket.on("disconnect", this._onDisconnectHandler);
        socket.on("newGame", this._onNewGameHandler);
        socket.on("joinGame", this._onJoinGameHandler);

        this._activeSockets.push(socket);
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
    const index = this._activeSockets.indexOf(socket);
    if (index !== -1) this._activeSockets.splice(index, 1);
};

/**
 * Creates a new ws-room.
 * @private
 */
const _onNewGameHandler = function () {
    console.log("newGame handler fired.");

    const roomId = this._createNewRoom(socket.id)
    socket.join(roomId);

    //Socket on client side should have a reference to its new room id.
    socket.broadcast.emit("newGame", { "roomId": roomId });

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

    if (userId && roomId && roomId in this._roomDataLookUp && roomId in this._roomUserLookUp) {
        this._roomUserLookUp[roomId].push(userId);
        gameData = this._roomDataLookUp[roomId];
        socket.join(roomId);
        roomJoined = true;
    }

    if (!roomJoined) {
        //@TODO need error handling. 
        socket.emit("joinFailed");

    } else {
        //Send existing data back to newly joined client.
        socket.emit("joinSuccess", gameData);
        //inform other uses new player has joined.
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
    const roomId = this._nextRoomId;

    this._roomDataLookUp[roomId] = {};
    this._roomUserLookUp[roomId] = [userId];

    this._nextRoomId++;
    return roomId;
}


/**
 * Public API
 */
exports.init = init;