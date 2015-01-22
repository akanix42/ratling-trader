define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var iocLoader = require('ioc-loader');

    'use strict';
    describe('ui - starting a new game', function () {
        it('should display the playing screen and render the first level, including the player', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var targetNumberOfDrawCalls = mockDisplay.size.width * mockDisplay.size.height;
            var numberOfDrawCalls = 0;
            var drewPlayer = false;
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                uiRoot.injector.register('display', new TestDisplay(drawCallback));
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
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
