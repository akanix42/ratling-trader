define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var GameRoot = require('game/game-root');
    var UiRoot = require('ui/ui-root');
    var when = require('when');

    'use strict';
    describe('ui - starting a new game', function () {
        it('should display the playing screen and render the first level, including the player', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var targetNumberOfDrawCalls = mockDisplay.size.width * mockDisplay.size.height;
            var numberOfDrawCalls = 0;
            var drewPlayer = false;
            var gameRoot = new GameRoot();
            var uiRoot = new UiRoot();
            var uiToGameBridge;
            var gameToUiBridge;

            when.all([uiRoot.init(), gameRoot.init()])
                .then(function () {
                    uiRoot._private.injector.register('display', new TestDisplay(drawCallback));

                    var ui = uiRoot.injector.resolve('ui');

                    uiToGameBridge = ui.uiBridge;
                    gameToUiBridge = gameRoot.injector.resolve('GameToUiBridge');

                    gameToUiBridge.uiBridge = uiToGameBridge;
                    uiToGameBridge.gameBridge = gameToUiBridge;

                    uiToGameBridge.initUi();
                    ui.screens.currentScreen.newGame();

                });


            function drawCallback(x, y, character) {
                numberOfDrawCalls++;
                if (character === '@')
                    drewPlayer = true;
                //console.log(numberOfDrawCalls + ' / ' + targetNumberOfDrawCalls);
                if (numberOfDrawCalls === targetNumberOfDrawCalls && drewPlayer)
                    done();
            }
        });
    });
});
