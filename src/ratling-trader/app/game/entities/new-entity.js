define(function () {


    function MixinMap(entity) {
        this._private = {
            entity: entity,
            map: new Map()
        }
    }

    MixinMap.prototype.add = function add(value) {
        value.applyTo(this._private.entity);
        this._private.map.set(value.constructor.name, value);
    };

    function Entity(tile) {
        this._private = {
            attributes: new Map(),
            characteristics: new Set(),
            mixins: new MixinMap(this),
            tile: tile
        };
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
        }

    };


    return Entity;
});