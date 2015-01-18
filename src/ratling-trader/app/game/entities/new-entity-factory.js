define(function () {
    var Entity = require('game/entities/new-entity');

    function EntityFactory(mixinMapFactory) {
        this._private = {
            mixinMapFactory: mixinMapFactory
        };
    }

    EntityFactory.prototype.create = function createEntity(tile) {
        var entity = new Entity(tile, this._private.mixinMapFactory);
        return entity;
    };
    return EntityFactory;
});