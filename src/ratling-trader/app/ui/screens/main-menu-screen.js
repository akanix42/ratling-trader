define(function (require) {
    var when = require('when');

    function MainMenuScreen(ui, uiToGameBridge, playingScreenFactory) {
        this._private = {
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            playingScreenFactory: playingScreenFactory
        };
    }

    MainMenuScreen.prototype = {
        loadGame: function () {
            var self = this;
            return when(self._private.uiToGameBridge.loadGame())
                .then(function () {
                    self._private.ui.screens.push(self._private.playingScreenFactory.create());
                });
        },
        newGame: function () {
            this._private.uiToGameBridge.startGame();
            this._private.ui.screens.push(this._private.playingScreenFactory.create());
        },
        render: function render() {

        }
    };

    function MainMenuScreenFactory(injector) {
        this._private = {
            injector: injector
        };
    }

    MainMenuScreenFactory.prototype = {
        create: function create(ui) {
            return this._private.injector.inject(MainMenuScreen, {ui: ui})
        }
    };

    return MainMenuScreenFactory;
});