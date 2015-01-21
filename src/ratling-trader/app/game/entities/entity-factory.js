define(function (require) {
    var Entity = require('game/entities/entity');

    function EntityFactory(mixinMapFactory) {
        this._private = {
            mixinMapFactory: mixinMapFactory
        };
    }

    EntityFactory.prototype.create = function createEntity(type, tile) {
        var entity = new Entity(type, tile, this._private.mixinMapFactory);
        return entity;
    };
    return EntityFactory;
});