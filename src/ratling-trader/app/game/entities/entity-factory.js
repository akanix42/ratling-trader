define(function (require) {
    var Entity = require('game/entities/entity'),
        extend = require('extend');

    function EntityFactory(injector, mixinMapFactory, entityTemplatesLoader, nullTile, commandHandlersFactory, eventHandlersFactory) {
        this._private = {
            mixinMapFactory: mixinMapFactory,
            entityTemplatesLoader: entityTemplatesLoader,
            commandHandlersFactory: commandHandlersFactory,
            eventHandlersFactory: eventHandlersFactory,
            injector: injector
        };
        this._private.defaultEntityData = getDefaultEntityData.call(this, nullTile);
    }

    EntityFactory.prototype.create = function createEntity(data) {
        data = normalizeData.call(this, data, this._private.entityTemplatesLoader.get(data.type));
        var entity = this._private.injector.inject(Entity, {
            data: data,
            commandHandlers: this._private.commandHandlersFactory.create(),
            eventHandlers: this._private.eventHandlersFactory.create()
        });
        //new Entity(data, this._private.mixinMapFactory,
        //    this._private.commandHandlersFactory.create(),
        //    this._private.eventHandlersFactory.create());
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