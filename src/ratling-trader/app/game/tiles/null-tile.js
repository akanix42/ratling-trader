define(function () {
    function NullTile() {
        this._private = {
            position: {x: -1, Y: -1},
            name: 'null'
        };
    }

    NullTile.prototype = {
        get position() {
            return this._private.position;
        },

        getNeighbor: function getNeighbor() {
            return this;
        },

    };


    return NullTile;

});