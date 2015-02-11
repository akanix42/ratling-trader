define(function (require) {
    function Game(gameToUiBridge, levelFactory, entityFactory, tileFactory, gameData) {
        this._private = {};

        var level = this._private.level = gameData
            ? levelFactory.create(gameData.levels[gameData.currentLevel])
            : levelFactory.create();
        this._private.player = entityFactory.create(gameData.player);
        gameToUiBridge.readyForPlayerInput();
    }

    Game.prototype = {
        get level() {
            return this._private.level;
        },
        get player() {
            return this._private.player;
        }

    };

    return Game;
});