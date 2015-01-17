define(function (require) {
    var NullTile = require('game/tiles/null-tile');
    var Tile = require('game/tiles/new-tile');
    var IntentHub = require('game/intents/new-intent-hub');

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
            return new Tile(level, position, new IntentHub());
        }
    };

    return TileFactory;

});