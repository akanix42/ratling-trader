define(function (require) {
    var Game = require('game/game');

    function GameFactory(levelFactory, entityFactory) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory
        };
    }

    GameFactory.prototype = {
        create: function create(gameToUiBridge) {
            return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory);
        }
    }

    return GameFactory;
});