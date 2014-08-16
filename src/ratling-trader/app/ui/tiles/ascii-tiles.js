define(function (require) {
    var TileType = require('enums/tile-type'),
        AsciiTile = require('ui/tiles/ascii-tile');

    var tiles = {};
    defineTiles();

    return Constructor;

    function Constructor() {
        var self = this;
        self.get = get;
        function get(tileType) {
            return tiles[tileType];
        }
    }

    function defineTiles() {
        tiles[TileType.Floor] = new AsciiTile('.');
        tiles[TileType.Wall] = new AsciiTile('#', 'goldenrod');

    }
});