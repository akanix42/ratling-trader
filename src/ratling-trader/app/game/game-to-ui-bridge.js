define(function (require) {
    var when = require('when');
    function GameToUiBridge(gameFactory, savedGameFactory) {
        this._private = {
            gameFactory: gameFactory,
            savedGameFactory: savedGameFactory,
            gameBridge: null,
            game: null
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

            this._private.game = this._private.savedGameFactory.create(this);
            deferred.resolve();
            return deferred.promise;
        }
    };

    return GameToUiBridge;
});