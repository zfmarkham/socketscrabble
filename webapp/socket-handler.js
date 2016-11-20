/**
 * Created by zmark_000 on 20/11/2016.
 */



module.exports = function(io, sessionMiddleware) {

    const mongoose = require('mongoose');
    const Game = require('../models/game').Game;

    io.use(function(socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });

    io.on('connection', function (socket) {

        socket.on('getGameInfo', ()=> {
            socket.emit('getGameInfo', socket.request.session.game);
        });

        socket.on('letterPlaced', (data) => {
            // TODO - find other sessions with the same game and emit to those
            socket.broadcast.emit('letterPlaced', data);
        });

        socket.on('submitWord', (data) => {
            // TODO Check word is valid

            // For now, just bash the tiles straight into the game
            Game.findById(socket.request.session.game._id, (err, game) => {
                if (game.tilesPlaced != "")
                {
                    game.tilesPlaced += ';';
                }

                game.tilesPlaced += data.placedTiles;

                let letters = data.placedTiles.split(';').map((e) => e.slice(-1));

                for (let i = 0; i < letters.length; i++)
                {
                    game.availableTiles[letters[i].toUpperCase()]--;
                }

                game.save((err, game, numAffected) => {

                });
            });
        })
    });
};