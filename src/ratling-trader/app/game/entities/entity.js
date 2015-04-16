define(function (require) {
    var EntityMovedEvent = require('game/events/entity-moved');
    var EntityNoLongerOnTileEvent = require('game/events/entity-no-longer-on-tile');
    var FovUpdatedEvent = require('game/events/fov-updated-event');

    function Entity(data, mixinMapFactory, commandHandlers, eventHandlers, entityAttributeFactory, entityInventory,
                    nullTile, entityAttributes, scheduler, stateMachine) {
        this._private = {
            type: data.type,
            space: data.space,
            data: data,
            attributes: entityAttributes,
            characteristics: new Set(),
            mixins: mixinMapFactory.create(this),
            commandHandlers: commandHandlers,
            eventHandlers: eventHandlers,
            entityAttributeFactory: entityAttributeFactory,
            nullTile: nullTile,
            tilesInFov: null,
            inventory: entityInventory,
            scheduler: scheduler,
            stateMachine: stateMachine
        };
        this.tile = data.tile;
        entityInventory.entity = this;
        entityInventory.initFrom(data.items);

        initAttributes(this, data);
        initMixins(data.mixins, this.mixins);
        stateMachine.states = data.states;

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
        get data() {
            return this._private.data;
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
            event.notifyEntity(this);
            if (oldTile)
                new EntityNoLongerOnTileEvent().notifyTile(oldTile, this);
            this.calculateFov();
        },
        get tilesInFov() {
            return this._private.tilesInFov;
        },
        get type() {
            return this._private.type;
        },

        calculateFov: function calculateFov() {
            if (this.tile === this._private.nullTile)
                return {};

            var sightRange = this.attributes.get('sight-range');
            if (!sightRange || !sightRange.base)
                return;

            this._private.tilesInFov = this.tile.level.calculateFov(this.tile.position.x,
                this.tile.position.y, this.attributes.get('sight-range').current);

            new FovUpdatedEvent().notifyEntity(this);

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