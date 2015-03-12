define(function (require) {
    var Entity = require('game/entities/entity'),
        extend = require('extend');

    function EntityFactory(mixinMapFactory, entityTemplatesLoader, nullTile, commandHandlersFactory, eventHandlersFactory) {
        this._private = {
            mixinMapFactory: mixinMapFactory,
            entityTemplatesLoader: entityTemplatesLoader,
            commandHandlersFactory: commandHandlersFactory,
            eventHandlersFactory: eventHandlersFactory
        };
        this._private.defaultEntityData = getDefaultEntityData.call(this, nullTile);
    }

    EntityFactory.prototype.create = function createEntity(data) {
        data = normalizeData.call(this, data, this._private.entityTemplatesLoader.get(data.type));
        var entity = new Entity(data, this._private.mixinMapFactory,
            this._private.commandHandlersFactory.create(),
            this._private.eventHandlersFactory.create());
        return entity;
    };

    return EntityFactory;

    function normalizeData(data, template) {
        return extend({}, this._private.defaultEntityData, template, data);
    }

    function getDefaultEntityData(nullTile) {
        var data = {
            tile: nullTile
        };

        return data;
    }
});