define(function (require) {
    var EntityMovedEvent = require('game/events/entity-moved');


    function Entity(data, mixinMapFactory, commandHandlers, eventHandlers, entityAttributeFactory) {
        this._private = {
            type: data.type,
            attributes: new Map(),
            characteristics: new Set(),
            mixins: mixinMapFactory.create(this),
            commandHandlers: commandHandlers,
            eventHandlers: eventHandlers,
            entityAttributeFactory: entityAttributeFactory
        };
        this.tile = data.tile;
        initAttributes(this, data);
        initMixins(data.mixins, this.mixins);


    }

    function initAttributes(entity, data) {
        if (!data.attributes)
            return;

        for (var i = 0; i < data.attributes.length; i++) {
            var attribute = data.attributes[i];
            entity.attributes.set(attribute.name, entity._private.entityAttributeFactory.create(attribute));
        }
    }

    Entity.prototype = {
        get attributes() {
            return this._private.attributes;
        },
        get characteristics() {
            return this._private.characteristics;
        },
        get commandHandlers() {
            return this._private.commandHandlers;
        },
        get eventHandlers() {
            return this._private.eventHandlers;
        },
        get mixins() {
            return this._private.mixins;
        },
        get tile() {
            return this._private.tile;
        },
        set tile(newTile) {
            var oldTile = this.tile;
            newTile.entities.add(this);

            if (this.tile)
                this.tile.entities.remove(this);

            this._private.tile = newTile;

            var event = new EntityMovedEvent(this, oldTile, newTile);
            this.eventHandlers.notify(event);
            newTile.eventHandlers.notify(event);
        },
        get type() {
            return this._private.type;
        },
        destroy: function destroy(){
            if (this.tile)
                this.tile.entities.remove(this);
        }

    };


    return Entity;

    function initMixins(mixins, mixinMap) {
        if (!mixins)
            return;
        for (var i = 0; i < mixins.length; i++)
            mixinMap.add(mixins[i]);
    }
});