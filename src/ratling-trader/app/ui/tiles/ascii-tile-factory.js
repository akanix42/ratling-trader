define(function () {

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

    }

    AsciiTileFactory.prototype = {
        get nullTile() {
            return new AsciiTile(null, null, null, '?');
        },
        create: function create(tile) {
            return new AsciiTile(tile);
        }
    };

    return AsciiTileFactory;
});