/**
 * Created by zmark_000 on 22/10/2016.
 */

module.exports = function(io) {
    const express = require('express');
    const router = express.Router();
    const path = require('path');

    const gameController = require("../webapp/controllers/GameController");

    router.get('/', function (req, res) {
        gameController.init(io);
        res.sendfile(path.resolve(__dirname + '/../resources/index.html'));
    });

    return router;
};