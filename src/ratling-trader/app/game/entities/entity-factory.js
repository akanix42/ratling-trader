define(function (require) {
    var Entity = require('game/entities/entity'),
        extend = require('extend');

    function EntityFactory(mixinMapFactory, nullTile) {
        this._private = {
            mixinMapFactory: mixinMapFactory,
        };
        this._private.defaultEntityData = getDefaultEntityData.call(this, nullTile);
    }

    EntityFactory.prototype.create = function createEntity(data) {
        data = normalizeData.call(this, data);
        var entity = new Entity(data, this._private.mixinMapFactory);
        return entity;
    };

    return EntityFactory;

    function normalizeData(data) {
        return extend({}, data, this._private.defaultEntityData);
    }

    function getDefaultEntityData(nullTile) {
        var data = {
            tile: nullTile
        };

        return data;
    }
});