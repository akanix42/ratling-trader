define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var EntityDamagedEvent = require('game/events/entity-damaged-event');

    'use strict';

    function Defender(entityFactory, nullTile) {
        AbstractMixin.apply(this);

        this._private.entityFactory = entityFactory;
        this._private.nullTile = nullTile;

        this.addEntityEventHandler(EntityAttackedEvent, this.onAttacked);
    }

    Defender.prototype = Object.create(AbstractMixin.prototype);

    Defender.prototype.onAttacked = function onAttacked(event) {
        var damageReceived = 0;
        var target = event.target;
        var tile = target.tile;
        var attack = event.attack;
        damageReceived += attack.physicalDamage - target.attributes.get('armor').current;
        if (damageReceived > 0)
            event.target.eventHandlers.notify(new EntityDamagedEvent(event.attacker, event.target, event.attack, damageReceived));
    };

    return Defender;
});