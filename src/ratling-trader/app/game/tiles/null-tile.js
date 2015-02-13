define(function (require) {
    var TileEntities = require('game/tiles/tile-entities');

    function NullTile() {
        this._private = {
            position: {x: -1, Y: -1},
            name: 'null',
            entities: new TileEntities(),

        };
    }

    NullTile.prototype = {
        get entities() {
            return this._private.entities;
        },
        get position() {
            return this._private.position;
        },

        getNeighbor: function getNeighbor() {
            return this;
        },

    };


    return NullTile;

});