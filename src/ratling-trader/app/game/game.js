define(function (require) {
    var PlayerInitializedEvent = require('game/events/player-initialized-event');

    function Game(gameToUiBridge, levelFactory, entityFactory, gameData, gameEventHub) {
        var self = this;
        self._private = {
            player: null
        };

        gameEventHub.subscribe(null, {
            class: PlayerInitializedEvent, handler: function (player) {
                self._private.player = player;
                gameToUiBridge.readyForPlayerInput();
            }
        });
        var level = self._private.level = gameData
            ? levelFactory.create(gameData.levels[gameData.currentLevel])
            : levelFactory.create();
        //this._private.player = entityFactory.create(gameData.player);
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