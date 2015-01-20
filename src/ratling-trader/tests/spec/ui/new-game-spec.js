define(function (require) {
    var TileFactory = require('tests/builders/tile-factory');
    var IntentHandlersFactory = require('game/intents/intent-handlers');

    'use strict';
    describe('starting a new game', function () {
        it('should display the playing screen and render the first level', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var targetNumberOfDrawCalls = mockDisplay.size.width * mockDisplay.size.height;
            var numberOfDrawCalls = 0;
            var userInterface = new UserInterface();
            var uiGameBridge = new MockUiGameBridge(new TileFactory(new IntentHandlersFactory()));

            userInterface.screens.push(new PlayingScreen(mockDisplay, uiGameBridge));


            function drawCallback() {
                numberOfDrawCalls++;
                console.log(numberOfDrawCalls + ' / ' + targetNumberOfDrawCalls);
                if (numberOfDrawCalls === targetNumberOfDrawCalls)
                    done();
            }
        });
    });
});

function AsciiTile(tile) {
    this._private = {
        tile: tile
    };
}
AsciiTile.prototype.draw = function draw(display) {
    var tile = this._private.tile;
    display.draw(tile.position.x, tile.position.y);
};
function ScreenStack() {
    this._private = {
        stack: []
    };
}

ScreenStack.prototype = {
    get currentScreen() {
        var stack = this._private.stack;
        return stack[stack.length - 1];
    },
    push: function (screen) {
        this._private.stack.push(screen);
        screen.render();
    },
};

function UserInterface() {
    this._private = {
        screens: new ScreenStack()
    };
}
UserInterface.prototype = {
    get screens() {
        return this._private.screens;
    }
};

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
    }
};

function PlayingScreen(display, uiGameBridge) {
    this._private = {
        display: display,
        uiGameBridge: uiGameBridge
    };
}

PlayingScreen.prototype = {
    render: function render() {
        var display = this._private.display;
        var tiles = this._private.uiGameBridge.gameState.level.tiles;
        for (var x = 0; x < display.size.width; x++) {
            var column = tiles.getColumn(x);
            for (var y = 0, columnLength = column.length; y < columnLength; y++) {
                var tile = column[y];
                var uiTile = new AsciiTile(tile);
                uiTile.draw(display);
            }
        }
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