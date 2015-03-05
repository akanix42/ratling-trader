define(function (require) {
    'use strict';
    var Game = require('game/game');

    function GameFactory(levelFactory, entityFactory, gameEventHub) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            gameEventHub: gameEventHub
        };
    }

    GameFactory.prototype = {
        create: function create(gameToUiBridge) {
            var game = new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, null,
                this._private.gameEventHub);
            var playerData = {type: 'player', tile: game.level.getRandomTile()};
            playerData.tile.entities.add(this._private.entityFactory.create(playerData));
            return game;
        }
    };

    return GameFactory;
});