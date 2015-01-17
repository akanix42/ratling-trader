define(function (require) {

    function Tile(level, position, intentHub) {
        this._private = {
            entities: new Set(),
            level: level,
            position: position,

            intentHub: intentHub
        };
    }

    Tile.prototype = {
        get entities() {
            return this._private.entities;
        },
        get intentHub() {
            return this._private.intentHub;
        },
        get level() {
            return this._private.level;
        },
        get position() {
            return this._private.position;
        },
        getNeighbor: function getNeighbor(direction) {
            return this.level.getTileAt(this.position.x + direction.x, this.position.y + direction.y);
        },

    };


    return Tile;

});