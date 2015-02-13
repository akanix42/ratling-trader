define(function (require) {
    'use strict';
    var Game = require('game/game');

    function GameFactory(levelFactory, entityFactory, gameEventHub) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            gameEventHub:gameEventHub
        };
    }

    GameFactory.prototype = {
        create: function create(gameToUiBridge) {
            return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, null,
                this._private.gameEventHub);
        }
    };

    return GameFactory;
});