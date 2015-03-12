define(function () {
    var Game = require('game/game');

    function SavedGameFactory(levelFactory, entityFactory, gameEventHub) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            gameEventHub: gameEventHub
        };
    }

    SavedGameFactory.prototype.create = function create(gameToUiBridge, gameData) {
        return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, gameData, this._private.gameEventHub);
    };

    return SavedGameFactory;
});