define(function () {
    function MainMenuScreen(ui, uiToGameBridge, playingScreenFactory) {
        this._private = {
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            playingScreenFactory: playingScreenFactory
        };
    }

    MainMenuScreen.prototype = {
        loadGame: function () {
            this._private.uiToGameBridge.loadGame();
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