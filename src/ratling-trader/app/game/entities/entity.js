define(function (require) {
    var EntityMovedEvent = require('game/events/entity-moved');


    function Entity(data, mixinMapFactory, commandHandlers, eventHandlers, entityAttributeFactory, entityInventory, nullTile) {
        this._private = {
            type: data.type,
            space: data.space,
            data: data,
            attributes: new Map(),
            characteristics: new Set(),
            mixins: mixinMapFactory.create(this),
            commandHandlers: commandHandlers,
            eventHandlers: eventHandlers,
            entityAttributeFactory: entityAttributeFactory,
            nullTile: nullTile,
            tilesInFov: null,
            inventory: entityInventory
        };
        this.tile = data.tile;

        entityInventory.entity = this;

        initAttributes(this, data);
        initMixins(data.mixins, this.mixins);
        if (this.tile.level && this.tile.level.isInitialized)
            this.calculateFov();

    }

    function initAttributes(entity, data) {
        if (!data.attributes)
            return;

        var keys = Object.keys(data.attributes);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attribute = data.attributes[key];
            entity.attributes.set(key, entity._private.entityAttributeFactory.create(attribute));
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
        get corpse() {
            return this._private.data.corpse;
        },
        get eventHandlers() {
            return this._private.eventHandlers;
        },
        get inventory() {
            return this._private.inventory;
        },
        get mixins() {
            return this._private.mixins;
        },
        get passesLight() {
            return this._private.data.passesLight || true;
        },
        get space() {
            return this._private.space;
        },
        get tile() {
            return this._private.tile;
        },
        set tile(newTile) {
            var oldTile = this.tile;
            if (newTile === null)
                newTile = this._private.nullTile;
            newTile.entities.add(this);

            if (this.tile)
                this.tile.entities.remove(this);

            this._private.tile = newTile;

            var event = new EntityMovedEvent(this, oldTile, newTile);
            this.eventHandlers.notify(event);
            newTile.eventHandlers.notify(event);
            this.calculateFov();
        },
        get type() {
            return this._private.type;
        },

        calculateFov: function calculateFov() {
            var sightRange = this.attributes.get('sight-range');
            if (!sightRange || !sightRange.base)
                return;

            this._private.tilesInFov = this.tile.level.calculateFov(this.tile.position.x,
                this.tile.position.y, this.attributes.get('sight-range').current);
        },
        destroy: function destroy() {
            this.tile = this._private.nullTile;

            //
            //this.commandHandlers.destroy();
            //this.eventHandlers.destroy();
            //this.intentHandlers.destroy();
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