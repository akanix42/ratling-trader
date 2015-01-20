define(function (require) {
    var TileFactory = require('game/tiles/tile-factory');
    var IntentHandlersFactory = require('game/intents/intent-handlers-factory');
    var ScreenStack = require('ui/screen-stack');
    var Ui = require('ui/ui');
    var PlayingScreen = require('ui/screens/playing-screen').constructs;
    var AsciiTileFactory = require('ui/tiles/ascii-tile-factory');

    'use strict';
    describe('ui - starting a new game', function () {
        it('should display the playing screen and render the first level', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var targetNumberOfDrawCalls = mockDisplay.size.width * mockDisplay.size.height;
            var numberOfDrawCalls = 0;
            var uiGameBridge = new MockUiGameBridge(new TileFactory(new IntentHandlersFactory()));


            var userInterface = new Ui(uiGameBridge, new ScreenStack(), {create: testPlayingScreenFactory});

            userInterface.init();

            function drawCallback() {
                numberOfDrawCalls++;
                //console.log(numberOfDrawCalls + ' / ' + targetNumberOfDrawCalls);
                if (numberOfDrawCalls === targetNumberOfDrawCalls)
                    done();
            }

            function testPlayingScreenFactory() {
                return new PlayingScreen(mockDisplay, uiGameBridge, new AsciiTileFactory());
            }
        });
    });
});

function MockUiGameBridge(tileFactory) {
    var self = this;
    this._private = {
        size: {
            width: 20,
            height: 20
        },
        tileFactory: tileFactory,
    };
    this._private.tiles = getTiles();

    function getTiles() {
        var width = self._private.size.width,
            height = self._private.size.height;
        var map = new Array(width);
        for (var x = 0; x < width; x++) {
            var column = map[x] = new Array(height);
            for (var y = 0; y < height; y++)
                column[y] = tileFactory.nullTile;
        }
        return map;
    }
}

MockUiGameBridge.prototype = {
    get gameState() {
        var self = this;
        return {
            level: {
                tiles: {
                    getColumn: function (x) {

                        return self._private.tiles[x];
                    }
                }
            }

        }
    },
    startGame: function () {

    }
};

function TestDisplay(drawCallback) {
    this._private = {
        drawCallback: drawCallback
    };
    this.size = {
        width: 20,
        height: 20
    };
}

TestDisplay.prototype = {
    draw: function draw() {
        this._private.drawCallback();
    }
}