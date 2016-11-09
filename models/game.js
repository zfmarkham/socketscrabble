/**
 * Created by zmark_000 on 09/11/2016.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    players: [Schema.ObjectId]
    // scores:
}) ;


// module.exports = mongoose.model('Game', Game);
module.exports.Game = mongoose.model('Game', Game); // Exporting this way makes intellisense work on models. Known bug with Webstorm. https://youtrack.jetbrains.com/issue/WEB-17099