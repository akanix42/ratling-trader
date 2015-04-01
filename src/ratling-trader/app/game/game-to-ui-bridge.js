define(function (require) {
    var when = require('when');
    var GameInitializedEvent = require('game/events/game-initialized-event');

    function GameToUiBridge(gameFactory, savedGameFactory, gameEventHub, eventRecorder) {
        this._private = {
            gameFactory: gameFactory,
            savedGameFactory: savedGameFactory,
            gameBridge: null,
            game: null,
            gameEventHub: gameEventHub,
            uiBridge: null
        };
        eventRecorder.gameToUiBridge = this;
    }

    GameToUiBridge.prototype = {
        get gameState() {
            return {
                level: {
                    tiles: this._private.game.level.tiles
                },
                player: this._private.game.player
            };
        },
        set uiBridge(uiBridge) {
            this._private.uiBridge = uiBridge;

        },

        startGame: function startGame() {
            var deferred = when.defer();
            this._private.gameEventHub.subscribe(null, {
                class: GameInitializedEvent,
                handler: function () {
                    deferred.resolve();
                }
            });

            this._private.game = this._private.gameFactory.create(this);
            return deferred.promise;
        },

        readyForPlayerInput: function readyForPlayerInput() {
            return this._private.uiBridge.readyForPlayerInput();
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
        },
        sendEvent: function sendEvent(event) {
            this._private.uiBridge.receiveGameEvent(event);
        }
    };

    return GameToUiBridge;
});