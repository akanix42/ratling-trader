define(function () {
    var when = require('when');

    function UiToGameBridge() {
        this._private = {
            gameBridge: null,
            inputDeferred: when.defer()
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
        readyForPlayerInput: function readyForPlayerInput() {
            this._private.inputDeferred.resolve();
            //console.log('ready for input');
        },
        initUi: function initUi() {
            this._private.ui.init();
        },
        startGame: function startGame() {
            this._private.gameBridge.startGame();
        },
        loadGame: function loadGame() {
            this._private.gameBridge.restoreGame();
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