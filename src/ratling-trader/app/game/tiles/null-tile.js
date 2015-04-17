define(function (require) {
    var TileEntities = require('game/tiles/tile-entities');

    function NullTile(nullIntentHandlersFactory, eventHandlers) {
        this._private = {
            position: {x: -1, Y: -1},
            name: 'null',
            entities: new TileEntities(),
            intentHandlers: nullIntentHandlersFactory.create(this),
            eventHandlers: eventHandlers,

        };
    }

    NullTile.prototype = {
        get entities() {
            return this._private.entities;
        },
        get position() {
            return this._private.position;
        },
        get intentHandlers() {
            return this._private.intentHandlers;
        },
        get eventHandlers() {
            return this._private.eventHandlers;
        },

        getNeighbor: function getNeighbor() {
            return this;
        },

    };

    return NullTile;

});