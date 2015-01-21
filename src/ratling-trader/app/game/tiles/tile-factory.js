define(function (require) {
    var NullTile = require('game/tiles/null-tile');
    var Tile = require('game/tiles/tile');

    function TileFactory(intentHandlersFactory, entityFactory) {
        this._private = {
            entityFactory: entityFactory,
            intentHandlersFactory: intentHandlersFactory,
            nullTile: new NullTile()
        };
    }

    TileFactory.prototype = {
        get nullTile() {
            return this._private.nullTile;
        },

        create: function (level, position, baseArchitecture) {
            var tileData = {
                level: level,
                position: position,
                baseArchitecture: baseArchitecture
            };
            return new Tile(tileData, this._private.intentHandlersFactory.create(), this._private.entityFactory);
        }
    };

    return TileFactory;

});