/**
 * Created by zmark_000 on 09/11/2016.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    players: [{
        playerId: Schema.ObjectId,
        score: Number,
        turnActive: Boolean,
        tiles: [String]
    }],
    tilesPlaced: {type: String, default: ""},
    availableTiles: {type: Schema.Types.Mixed, default: {
        A: 9,
        B: 2,
        C: 2,
        D: 4,
        E: 12,
        F: 2,
        G: 3,
        H: 2,
        I: 9,
        J: 1,
        K: 1,
        L: 4,
        M: 2,
        N: 6,
        O: 8,
        P: 2,
        Q: 1,
        R: 6,
        S: 4,
        T: 6,
        U: 4,
        V: 2,
        W: 2,
        X: 1,
        Y: 2,
        Z: 1
    }}
}) ;


// module.exports = mongoose.model('Game', Game);
module.exports.Game = mongoose.model('Game', Game); // Exporting this way makes intellisense work on models. Known bug with Webstorm. https://youtrack.jetbrains.com/issue/WEB-17099