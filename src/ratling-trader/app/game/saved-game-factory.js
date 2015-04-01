define(function () {
    var Game = require('game/game');

    function SavedGameFactory(levelFactory, entityFactory, gameEventHub, scheduler) {
        this._private = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            gameEventHub: gameEventHub,
            scheduler: scheduler

        };
    }

    SavedGameFactory.prototype.create = function create(gameToUiBridge, gameData) {
        return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, gameData,
            this._private.gameEventHub, this._private.scheduler);
    };

    return SavedGameFactory;
});