define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');
    var EntityDamagedEvent = require('game/events/entity-damaged-event');

    'use strict';

    function Destructible(entityFactory, nullTile) {
        AbstractMixin.apply(this);

        this._private.entityFactory = entityFactory;
        this._private.nullTile = nullTile;

        this.addEntityEventHandler(EntityDamagedEvent, this.onDamaged);
    }

    Destructible.prototype = Object.create(AbstractMixin.prototype);

    Destructible.prototype.onDamaged = function onDamaged(event) {
        var target = event.target;
        var tile = target.tile;
        target.attributes.get('health').base -= event.damage;

        if (target.attributes.get('health').current === 0) {
            createCorpse.call(this, target);
            tile.eventHandlers.notify(new EntityDestroyedEvent(event.attacker, event.target, event.attack));
            target.eventHandlers.notify(new EntityDestroyedEvent(event.attacker, event.target, event.attack));
        }

    };


    function createCorpse(target) {
        if (target.corpse) {
            var corpse = this._private.entityFactory.create({type: target.corpse});
            corpse.tile = target.tile;
            corpse.was = target;
            target.tile = this._private.nullTile;
        } else
            target.destroy();
    }

    return Destructible;
});