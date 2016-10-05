
module.exports = Game;


/**
 * @Class
 * Game class to encapsulate all data required to draw a gameData.
 * @param {number} game Id.
 */
function Game(id) {

    this.gameId = id;
    this.players = [];
    this.gameData = new GameData();
}

/**
 * 
 * @public
 * @param {number}
 */
Game.prototype.addPlayer = function (playerId) {
    this.players.push(playerId);
}

/**
 * 
 * @public
 * @param {number}
 */
Game.prototype.removePlayer = function (playerId) {
    const index = this.players.indexOf(playerId);
    if (index !== -1) this.players.splice(index, 1);
}
