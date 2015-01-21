define(function () {
    var TestDisplay = require('tests/helpers/test-display');
    var GameRoot = require('game/game-root');
    var UiRoot = require('ui/ui-root');
    var when = require('when');
    var ROT = require('rot');
    'use strict';
    describe('ui - interacting with a game', function () {
        it('should move the player in response to the arrow keys', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var positions = [
                {x: 5, y: 5, key: ROT.VK_LEFT},
                {x: 4, y: 5, key: ROT.VK_RIGHT},
                {x: 4, y: 4, key: ROT.VK_UP},
                {x: 5, y: 4, key: ROT.VK_DOWN},
                {x: 5, y: 5},
            ];
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
    //function bindInputEvents() {
    //    bindInputEvent('keydown');
    //    bindInputEvent('keyup');
    //    bindInputEvent('keypress');
    //
    //    function bindInputEvent(event) {
    //        window.addEventListener(event, function (e) {
    //            if (e.keyCode === ROT.VK_F5)
    //                return;
    //            e.preventDefault();
    //            screenManager.handleInput(event, e);
    //
    //        });
    //    }
    //}
})