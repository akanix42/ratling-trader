define(function (require) {
    var NullTile = require('game/tiles/null-tile');
    var Tile = require('game/tiles/new-tile');

    function TileFactory() {
        this._private = {
            nullTile: new NullTile()
        };
    }

    TileFactory.prototype = {
        get nullTile() {
            return this._private.nullTile;
        },

        create: function (level, position) {
            return new Tile(level, position);
        }
    };

    return TileFactory;

});