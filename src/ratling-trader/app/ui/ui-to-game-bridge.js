define(function () {
    var when = require('when');

    function UiToGameBridge() {
        this._private = {
            gameBridge: null,
            inputDeferred: null,
            inputQueue: []
        };
        this._private.ui = null;
    }

    UiToGameBridge.prototype = {
        get gameState() {
            return this._private.gameBridge.gameState;
        },
        set gameBridge(gameBridge) {
            this._private.gameBridge = gameBridge;
        },
        set ui(ui) {
            this._private.ui = ui;
        },
        queueInput: function queueInput(input) {
            if (this._private.inputDeferred) {
                this._private.inputDeferred.resolve(input);
                this._private.inputDeferred = null;
            }
            else {
                this._private.inputQueue.push(input);
            }
        },
        readyForPlayerInput: function readyForPlayerInput() {
            var deferred = when.defer();

            if (this._private.inputQueue.length)
                deferred.resolve(this._private.inputQueue.shift());
            else
                this._private.inputDeferred = deferred;

            return deferred.promise;
        },
        initUi: function initUi() {
            this._private.ui.init();
        },
        startGame: function startGame() {
            this._private.gameBridge.startGame();
        },
        loadGame: function loadGame() {
            return this._private.gameBridge.restoreGame();
        }

    };
    //
    //function UiToGameBridgeFactory() {
    //
    //}
    //
    //UiToGameBridgeFactory.prototype.create = function create(ui) {
    //    return new UiToGameBridge(ui);
    //};
    //return UiToGameBridgeFactory;
    return UiToGameBridge;
});