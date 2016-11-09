/**
 * Created by zmark_000 on 22/10/2016.
 */

module.exports = function(io) {
    const express = require('express');
    const passport = require('passport');
    const Account = require('../models/account').Account;
    const Game = require('../models/game').Game;
    const router = express.Router();
    const path = require('path');

    const gameController = require("../webapp/controllers/GameController");

    router.get('/', (req, res) => {
        gameController.init(io);
        res.sendfile(path.resolve(__dirname + '/../index.html'));
    });

    router.post('/createGame', (req, res) => {

        // Calling .lean here stops the query from returning model objects, returns them as plain objects instead
        var players = Account.find({}).lean().exec((err, users) => {

            if (!err)
            {
                var playerInfo = [];
                
                for (let i = 0; i < 2; i++)
                {
                    playerInfo.push({
                        playerId: users[i]._id,
                        score: 0,
                        turnActive: false
                    })
                }
                
                Game.create({players: playerInfo}, (err, game) => {

                    // This should probably be done using model.Update and have a promise attached to it to know all players have been updated successfully
                    // Or look into using the mongoose update function which can take various params to query by ID and specify pushing to array 
                    for (let i = 0; i < game.players.length; i++)
                    {
                        Account.findById(game.players[i].playerId, (err, player) => {
                            player.activeGames.push(game._id);
                            player.save((err, player, numAffected) =>
                            {
                                debugger;
                            });
                        });
                    }
                });
            }
        });

        // Send something so request doesn't lock up
        res.send('test');
    });

    router.post('/register', (req, res) => {
        Account.register(new Account({username: req.body.username}), req.body.password, (err, account) => {
            if (err) {
                return res.send(err);
            }

            passport.authenticate('local')(req, res, () => {
                // res.redirect('/');
                res.send('Account registered successfully');
            })
        })
    });

    router.get('/login', (req, res) => {
        res.render('login', { user : req.user });
    });

    router.post('/login', passport.authenticate('local'), (req, res) => {
        res.redirect('/');
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/ping', (req, res) => {
        res.status(200).send("pong!");
    });

    return router;
};