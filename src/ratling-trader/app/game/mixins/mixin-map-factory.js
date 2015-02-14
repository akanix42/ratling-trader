define(function () {

    function MixinMap(entity, loadedMixins) {
        this._private = {
            entity: entity,
            map: new Map(),
            loadedMixins: loadedMixins
        };

    }

    MixinMap.prototype.add = function add(value) {
        debugger;
        value.applyTo(this._private.entity);
        this._private.map.set(value.constructor.name, value);
    };


    function MixinMapFactory(loadedMixins) {
        this._private = {
            loadedMixins: loadedMixins
        };
    }

    MixinMapFactory.prototype.create = function create(entity) {
        return new MixinMap(entity, this._private.loadedMixins);
    };

    return MixinMapFactory;
});