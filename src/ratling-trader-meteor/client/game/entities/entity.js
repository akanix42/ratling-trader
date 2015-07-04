"use strict";
//var EntityMovedEvent = require('game/events/entity-moved');
//var EntityNoLongerOnTileEvent = require('game/events/entity-no-longer-on-tile');
//var FovUpdatedEvent = require('game/events/fov-updated-event');
//
//Entity.typeName = "entity";
//JSONC.register(Entity);
Entity.$inject = ["entityInventory", "entityAttributes", "stateMachine", "entities"];
Game.registerUnique("entity", Entity);

function Entity(entityInventory, entityAttributes, stateMachine, entities) {
    this._ = {
        id: null,
        type: null,
        space: null,
        data: null,
        tile: null,
        extra: {},
        attributes: entityAttributes,
        characteristics: new Set(),
        tilesInFov: null,
        inventory: entityInventory,
        stateMachine: stateMachine,
        entities: entities,
        mixins: null
    };
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
    get extra() {
        return this._.extra;
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
        setTile.call(this, newTile);
    },
    get tilesInFov() {
        return this._.tilesInFov;
    },

    get type() {
        return this._.type;
    },

    calculateFov: function calculateFov() {
        if (this.tile === null)
            return this._.tilesInFov = null;

        var sightRange = this.attributes.get('sight-range');
        if (!sightRange || !sightRange.base)
            return this._.tilesInFov = null;

        this._.tilesInFov = this.tile.level.calculateFov(this.tile.position.x,
            this.tile.position.y, this.attributes.get('sight-range').current);

        postal.publish({
            channel: this.channel,
            topic: "fov.updated",
            data: {
                oldTile: oldTile,
                newTile: newTile
            }
        });
    },
    destroy: function destroy() {
        this.tile = this._.nullTile;

        this._.entities.remove(this);
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
    //toDto: function toDto() {
    //    var entity = this;
    //    var _ = entitiy._;
    //    return {
    //        id: _.id,
    //        type: _.type,
    //        extra: _.extra,
    //        attributes: _.attributes.toDto()
    //    };
    //}

};

function setTile(newTile) {
    var oldTile = this.tile;

    if (oldTile)
        oldTile.entities.remove(this);

    if (newTile !== null)
        newTile.entities.add(this);

    this._.tile = newTile;

    publishEntityMovedEvent(this.channel, oldTile, newTile);
    publishEntityRemovedEvent(oldTile, newTile);

    this.calculateFov();
}

function publishEntityMovedEvent(channel, oldTile, newTile) {
    postal.publish({
        channel: channel,
        topic: "moved",
        data: {
            oldTile: oldTile,
            newTile: newTile
        }
    });
}

function publishEntityRemovedEvent(oldTile, newTile) {
    if (oldTile)
        postal.publish({
            channel: oldTile.channel,
            topic: "entity.removed",
            data: {
                oldTile: oldTile,
                newTile: newTile
            }
        });
}

function initMixins(mixins, mixinMap) {
    if (!mixins)
        return;
    for (var i = 0; i < mixins.length; i++)
        mixinMap.add(mixins[i]);
}
