define(function (require) {
    var ROT = require('rot');
    var GameRoot = require('game/game-root');
    var UiRoot = require('ui/ui-root');
    var when = require('when');

    var gameRoot = new GameRoot();
    var uiRoot = new UiRoot();
    var uiToGameBridge;
    var gameToUiBridge;

    when.all([uiRoot.init(), gameRoot.init()])
        .then(function () {
            uiToGameBridge = uiRoot.injector.resolve('ui').uiBridge;
            gameToUiBridge = gameRoot.injector.resolve('GameToUiBridge');

            gameToUiBridge.uiBridge = uiToGameBridge;
            uiToGameBridge.gameBridge = gameToUiBridge;

            uiToGameBridge.initUi();
            //gameToUiBridge.startGame();
        });
});