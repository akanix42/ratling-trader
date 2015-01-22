define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');

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

            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                uiRoot.injector.register('display', new TestDisplay(drawCallback));
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
                ui.screens.currentScreen.newGame();
            });

            function drawCallback(x, y, character) {
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