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


    function MixinMapFactory() {

    }

    MixinMapFactory.prototype.create = function create(entity) {
        return new MixinMap(entity);
    };

    return MixinMapFactory;
});