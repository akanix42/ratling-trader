define(function (require) {
    var when = require('when');
    var GameInitializedEvent = require('game/events/game-initialized-event');

    function GameToUiBridge(gameFactory, savedGameFactory, gameEventHub) {
        this._private = {
            gameFactory: gameFactory,
            savedGameFactory: savedGameFactory,
            gameBridge: null,
            game: null,
            gameEventHub: gameEventHub
        };
    }

    GameToUiBridge.prototype = {
        get gameState() {
            return {
                level: {
                    tiles: this._private.game.level.tiles
                }
            };
        },
        set uiBridge(uiBridge) {
            this._private.uiBridge = uiBridge;

        },

        startGame: function startGame() {
            this._private.game = this._private.gameFactory.create(this);
        },

        readyForPlayerInput: function readyForPlayerInput() {
            this._private.uiBridge.readyForPlayerInput();
        },

        restoreGame: function restoreGame() {
            var deferred = when.defer();
            this._private.gameEventHub.subscribe(null, {
                class: GameInitializedEvent,
                handler: function () {
                    deferred.resolve();
                }
            });

            this._private.game = this._private.savedGameFactory.create(this);
            return deferred.promise;
        }
    };

    return GameToUiBridge;
});