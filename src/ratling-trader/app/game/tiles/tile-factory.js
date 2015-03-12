define(function (require) {
    var Tile = require('game/tiles/tile');

    function TileFactory(intentHandlersFactory, eventHandlersFactory, entityFactory, nullTile) {
        this._private = {
            entityFactory: entityFactory,
            intentHandlersFactory: intentHandlersFactory,
            eventHandlersFactory: eventHandlersFactory,
            nullTile: nullTile
        };
    }

    TileFactory.prototype = {
        get nullTile() {
            return this._private.nullTile;
        },

        create: function (tileData) {
            return new Tile(tileData, this._private.intentHandlersFactory.create(),
                this._private.eventHandlersFactory.create(), this._private.entityFactory);
        }
    };

    return TileFactory;

});