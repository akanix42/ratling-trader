define(function (require) {
    var when = require('when');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var GameEventReceivedEvent = require('ui/events/game-event-received-event');

    function UiToGameBridge(eventHandlersFactory) {
        this._private = {
            gameBridge: null,
            inputDeferred: null,
            inputQueue: [],
            eventHandlers: eventHandlersFactory.create(),
            gameEventHandlers: eventHandlersFactory.create()
        };
        this._private.ui = null;
    }

    UiToGameBridge.prototype = {
        get eventHandlers() {
            return this._private.eventHandlers;
        },
        get gameEventHandlers() {
            return this._private.gameEventHandlers;
        },
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

            if (this._private.inputQueue.length) {
                debugger;
                deferred.resolve(this._private.inputQueue.shift());
            }
            else {
                this._private.inputDeferred = deferred;
                this._private.eventHandlers.notify(new ReadyForPlayerInputEvent());
            }

            return deferred.promise;
        },
        initUi: function initUi() {
            this._private.ui.init();
        },
        startGame: function startGame() {
            return this._private.gameBridge.startGame();
        },
        loadGame: function loadGame() {
            return this._private.gameBridge.restoreGame();
        },
        receiveGameEvent: function (event) {
            this._private.gameEventHandlers.notify(event);
        },


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