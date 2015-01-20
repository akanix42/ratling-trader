define(function (require) {
    function Game(gameToUiBridge, levelFactory, entityFactory, gameData) {
        this._private = {};

        var level = this._private.level = gameData
            ? levelFactory.create(gameData.levels[gameData.currentLevel])
            : levelFactory.create();
        this._private.player = entityFactory.create('player', level.getRandomTile());
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