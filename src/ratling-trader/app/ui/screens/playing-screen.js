define(function (require) {
    //var PlayingScreen = require('ui/screens/playing-screen');


    function PlayingScreen(display, uiToGameBridge, asciiTileFactory) {
        this._private = {
            display: display,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory
        };
        uiToGameBridge.startGame();
    }

    PlayingScreen.prototype = {
        render: function render() {
            var display = this._private.display;
            var tiles = this._private.uiToGameBridge.gameState.level.tiles;
            for (var x = 0; x < display.size.width; x++) {
                var column = tiles[x];
                for (var y = 0; y < display.size.height; y++) {
                    var tile;
                    var uiTile;
                    if (column === undefined || !column[y]) {
                        tile = 'null';//this._private.asciiTileFactory.nullTile;
                        uiTile = this._private.asciiTileFactory.create(tile);
                    }
                    else {
                        tile = column[y];
                        uiTile = this._private.asciiTileFactory.create(tile.entities.all()[0]);
                    }
                    uiTile.draw(display, x, y);
                }
            }
        }
    };

    //return PlayingScreen;
    function PlayingScreenFactory(injector) {
        this._private = {
            injector: injector
        };
    }

    PlayingScreenFactory.prototype.create = function create() {
        return this._private.injector.inject(PlayingScreen)
    };

    PlayingScreenFactory.constructs = PlayingScreen;

    return PlayingScreenFactory;
});