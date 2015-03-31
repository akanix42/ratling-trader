define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var iocLoader = require('ioc-loader');

    'use strict';
    describe('ui - starting a new game', function () {
        it('should display the playing screen and render the first level, including the player', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var targetNumberOfDrawCalls;
            var numberOfDrawCalls = 0;
            var drewPlayer = false;
            var start;
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                uiRoot.injector.register('display', new TestDisplay(drawCallback));
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
                start = new Date();
                return ui.screens.currentScreen.newGame().then(function () {
                    return ui;
                });
            }).then(function (ui) {
                var fov = ui.uiBridge._private.gameBridge._private.game.player._private.tilesInFov;
                targetNumberOfDrawCalls = Object.keys(fov).length;
                if (numberOfDrawCalls === targetNumberOfDrawCalls && drewPlayer)
                    done(start);
                else
                    done('not enough draw calls!', start);
            });

            function drawCallback(x, y, character) {
                numberOfDrawCalls++;
                if (character === '@')
                    drewPlayer = true;
                //console.log(numberOfDrawCalls + ' / ' + targetNumberOfDrawCalls);

            }
        });
    });
});
