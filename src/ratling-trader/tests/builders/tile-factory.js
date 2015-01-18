define(function (require) {
    var NullTile = require('game/tiles/null-tile');
    var Tile = require('game/tiles/tile');

    function TileFactory(intentHandlersFactory) {
        this._private = {
            intentHandlersFactory: intentHandlersFactory,
            nullTile: new NullTile()
        };
    }

    TileFactory.prototype = {
        get nullTile() {
            return this._private.nullTile;
        },

        create: function (level, position) {
            return new Tile(level, position, this._private.intentHandlersFactory.create());
        }
    };

    return TileFactory;

});