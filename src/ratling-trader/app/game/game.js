define(function (require) {
    var PlayerInitializedEvent = require('game/events/player-initialized-event');
    var GameInitializedEvent = require('game/events/game-initialized-event');
    var when = require('when');

    function Game(gameToUiBridge, levelFactory, entityFactory, gameData, gameEventHub) {
        var self = this;
        self._private = {
            player: null

        };

        var deferredsMap = notifyWhenInitialized(self, gameEventHub);
        getPlayer(self, gameEventHub, gameToUiBridge, deferredsMap);

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

    function getPlayer(game, gameEventHub, gameToUiBridge, deferredsMap) {
        gameEventHub.subscribe(null, {
            class: PlayerInitializedEvent, handler: function (sourceEntity, event) {
                game._private.player = event.player;
                gameToUiBridge.readyForPlayerInput();
                deferredsMap.get(PlayerInitializedEvent.name).resolve();
            }
        });

    }

    function notifyWhenInitialized(game, gameEventHub) {
        var deferreds = [];
        var deferredsMap = new Map();

        addDeferred(PlayerInitializedEvent.name);

        when.all(deferreds)
            .then(function () {
                gameEventHub.notify(new GameInitializedEvent(game));
            });

        return deferredsMap;

        function addDeferred(name) {
            deferredsMap.set(name, when.defer());
            deferreds.push(deferredsMap.get(name).promise);

        }
    }
});