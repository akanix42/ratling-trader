define(function (require) {
    'use strict';
    var Game = require('game/game');

    function GameFactory(levelFactory, entityFactory, gameEventHub, scheduler) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            gameEventHub: gameEventHub,
            scheduler: scheduler
        };
    }

    GameFactory.prototype = {
        create: function create(gameToUiBridge) {
            var game = new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, null,
                this._private.gameEventHub, this._private.scheduler);
            var playerData = {type: 'player', tile: game.level.getRandomTile()};
            playerData.tile.entities.add(this._private.entityFactory.create(playerData));
            return game;
        }
    };

    return GameFactory;
});