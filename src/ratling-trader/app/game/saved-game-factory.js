define(function () {
    var Game = require('game/game');

    function SavedGameFactory(levelFactory, entityFactory) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory
        };
    }

    SavedGameFactory.prototype.create = function create(gameToUiBridge, gameData) {
        return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, gameData);
    };

    return SavedGameFactory;
});