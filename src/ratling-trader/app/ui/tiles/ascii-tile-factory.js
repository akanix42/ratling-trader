define(function (require) {
    var asciiTiles = require('json!config/ascii.json');

    function AsciiTile(tile, foregroundColor, backgroundColor, character) {
        this._private = {
            tile: tile,
            foregroundColor: foregroundColor || 'white',
            backgroundColor: backgroundColor || 'black',
            character: character || '?'
        };
    }

    AsciiTile.prototype.draw = function draw(display, x, y) {
        var tile = this._private.tile;
        display.draw(x, y, this._private.character, this._private.foregroundColor, this._private.backgroundColor);
    };

    function AsciiTileFactory() {
        var tiles = {};
        this._private = {
            tiles: tiles
        };

        loadTiles();

        function loadTiles() {
            for (var i = 0; i < asciiTiles.length; i++)
                addAsciiTile(asciiTiles[i]);
        }

        function addAsciiTile(template) {
            tiles[template.name] = new AsciiTile(template.character, template.color, null);
        }
    }

    AsciiTileFactory.prototype = {
        get nullTile() {
            return this._private.tiles['null'];
        },
        create: function create(tile) {
            return this._private.tiles[tile] || this.nullTile;
        }
    };

    return AsciiTileFactory;
});