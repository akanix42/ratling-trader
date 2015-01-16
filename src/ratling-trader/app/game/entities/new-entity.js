define(function () {
    function Entity(tile) {
        this._private = {
            attributes: new Map(),
            tile: tile
        };
    }

    Entity.prototype = {
        get attributes() {
            return this._private.attributes;
        },
        get tile() {
            return this._private.tile;
        },
        set tile(tile) {
            tile.addEntity(this);
            this._private.tile = tile;
        }
    };

    return Entity;
});