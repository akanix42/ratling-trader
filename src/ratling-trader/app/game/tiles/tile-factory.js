define(function (require) {
    var Tile = require('game/tiles/tile');

    function TileFactory(intentHandlersFactory, entityFactory, nullTile) {
        this._private = {
            entityFactory: entityFactory,
            intentHandlersFactory: intentHandlersFactory,
            nullTile: nullTile
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