define(function (require) {
    'use strict';
    var EntityMovedEvent = require('game/events/entity-moved');
    var EntityNoLongerOnTileEvent = require('game/events/entity-no-longer-on-tile');
    var FovUpdatedEvent = require('game/events/fov-updated-event');


    Entity.lastEntityId = 1;
    function getNextId() {
        return Entity.lastEntityId++;
    }

    function Entity(mixinMapFactory, commandHandlers, eventHandlers, entityAttributeFactory, entityInventory,
                    nullTile, entityAttributes, scheduler, stateMachine, gameEntities) {
        this._ = this._private = {
            id: null,
            type: null,
            space: null,
            data: null,
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
            stateMachine: stateMachine,
            gameEntities: gameEntities
        };
    }

    function initAttributes(entity, data) {
        if (!data.attributes)
            return;

        var keys = Object.keys(data.attributes);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attribute = data.attributes[key];
            entity.attributes.set(key, entity._.entityAttributeFactory.create(attribute));
        }
    }

    Entity.prototype = {
        get attributes() {
            return this._.attributes;
        },
        get characteristics() {
            return this._.characteristics;
        },
        get commandHandlers() {
            return this._.commandHandlers;
        },
        get corpse() {
            return this._.data.corpse;
        },
        get eventHandlers() {
            return this._.eventHandlers;
        },
        get data() {
            return this._.data;
        },
        get id() {
            return this._.id;
        },
        get inventory() {
            return this._.inventory;
        },
        get mixins() {
            return this._.mixins;
        },
        get passesLight() {
            return this._.data.passesLight || true;
        },
        get space() {
            return this._.space;
        },
        get tile() {
            return this._.tile;
        },
        set tile(newTile) {
            var oldTile = this.tile;
            if (newTile === null)
                newTile = this._.nullTile;
            newTile.entities.add(this);

            if (this.tile)
                this.tile.entities.remove(this);

            this._.tile = newTile;

            var event = new EntityMovedEvent(this, oldTile, newTile);
            event.notifyEntity(this);
            if (oldTile)
                new EntityNoLongerOnTileEvent().notifyTile(oldTile, this);
            this.calculateFov();
        },
        get tilesInFov() {
            return this._.tilesInFov;
        },
        get type() {
            return this._.type;
        },

        calculateFov: function calculateFov() {
            if (this.tile === this._.nullTile)
                return {};

            var sightRange = this.attributes.get('sight-range');
            if (!sightRange || !sightRange.base)
                return;

            this._.tilesInFov = this.tile.level.calculateFov(this.tile.position.x,
                this.tile.position.y, this.attributes.get('sight-range').current);

            new FovUpdatedEvent().notifyEntity(this);

        },
        destroy: function destroy() {
            this.tile = this._.nullTile;

            this._.gameEntities.remove(this);
            //
            //this.commandHandlers.destroy();
            //this.eventHandlers.destroy();
            //this.intentHandlers.destroy();
        },
        init: function init(data, idGenerator) {
            var _ = this._;
            _.id = idGenerator.getNextId('entity');
            _.type = data.type;
            _.space = data.space;
            _.data = data;

            this.tile = data.tile;

            _.inventory.entity = this;
            _.inventory.initFrom(data.items);

            initAttributes(this, data);
            initMixins(data.mixins, this.mixins);
            _.stateMachine.states = data.states;

            if (this.tile.level && this.tile.level.isInitialized)
                this.calculateFov();

            return this;
        },
        toDto: function toDto() {
            var entity = this;
            return {
                id: entity._.id,
                type: entity._.type
            };
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