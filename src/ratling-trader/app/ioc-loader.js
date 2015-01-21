define(function (require) {
    var GameRoot = require('game/game-root');
    var UiRoot = require('ui/ui-root');
    var when = require('when');
    return {
        init: function init(callback) {

            var gameRoot = new GameRoot();
            var uiRoot = new UiRoot();
            var uiToGameBridge;
            var gameToUiBridge;

            return when.all([uiRoot.init(), gameRoot.init()])
                .then(function () {
                    if (typeof callback === 'function')
                        callback(gameRoot, uiRoot);
                })
                .then(function () {
                    var ui = uiRoot.injector.resolve('ui');

                    uiToGameBridge = ui.uiBridge;
                    gameToUiBridge = gameRoot.injector.resolve('GameToUiBridge');

                    gameToUiBridge.uiBridge = uiToGameBridge;
                    uiToGameBridge.gameBridge = gameToUiBridge;

                    uiToGameBridge.initUi();

                    return ui;
                });

        }
    };
});