define(function () {


    function Entity(type, tile, mixinMapFactory) {
        this._private = {
            type: type,
            attributes: new Map(),
            characteristics: new Set(),
            mixins: mixinMapFactory.create(this),

        };
        this.tile = tile;
    }

    Entity.prototype = {
        get attributes() {
            return this._private.attributes;
        },
        get characteristics() {
            return this._private.characteristics;
        },
        get mixins() {
            return this._private.mixins;
        },
        get tile() {
            return this._private.tile;
        },
        set tile(tile) {
            tile.entities.add(this);
            this._private.tile = tile;
        },
        get type() {
            return this._private.type;
        }

    };


    return Entity;
});