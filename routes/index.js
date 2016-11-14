/**
 * Created by zmark_000 on 22/10/2016.
 */

const isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect them to the login page
    res.redirect('/');
};

module.exports = function(io, passport) {
    const express = require('express');
    const mongoose = require('mongoose');
    const Account = require('../models/account').Account;
    const Game = require('../models/game').Game;
    const router = express.Router();
    const path = require('path');

    const gameController = require("../webapp/controllers/GameController");

    router.get('/', (req, res) => {
        res.render('index', {message: req.flash('message')});
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.get('/register', (req, res) => {
        res.render('register', {message: req.flash('message')});
    });

    router.post('/register', passport.authenticate('register', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash: true
    }));

    router.get('/home', isAuthenticated, (req, res) => {
        res.render('home', {username: req.user.username, activeGames: req.user.activeGames});
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

    router.param('id', (req, res, next, id) => {

        // Check game exists in users active games
        if (req.user && req.user.activeGames.map(e=>e.toString()).includes(id))
        {
            req.id = id;
        }

        next();
    });

    router.get('/game/:id', isAuthenticated, (req, res) => {

        if (req.id)
        {
            var game = Game.findOne({_id: req.id}, (err, obj) => {
                req.session.game = obj;
                res.render('game', {data: obj});
            });
        }
        else
        {
            // Id not valid, do something
        }
    });

    return router;
};