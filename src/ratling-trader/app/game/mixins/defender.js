define(function (require) {
    'use strict';
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var EntityDamagedEvent = require('game/events/entity-damaged-event');
    var AoeDamageEvent = require('game/events/aoe-damage-event');
    var EntityMovedEvent = require('game/events/entity-moved');


    function Defender(entityFactory, nullTile) {
        AbstractMixin.apply(this);

        this._private.entityFactory = entityFactory;
        this._private.nullTile = nullTile;

        this.addEntityEventHandler(EntityAttackedEvent, this.onAttacked);
        this.addEventHandler(AoeDamageEvent, onAoeAttack);
        this.addEntityEventHandler(EntityMovedEvent, onEntityMoved);
    }

    Defender.prototype = Object.create(AbstractMixin.prototype);

    Defender.prototype.onAttacked = function onAttacked(event) {
        var damageReceived = 0;
        var target = event.target;
        var tile = target.tile;
        var attack = event.attack;
        damageReceived += attack.physicalDamage - target.attributes.get('armor').current;
        if (damageReceived > 0)
            new EntityDamagedEvent(event.attacker, event.target, event.attack, damageReceived).notifyEntity(event.target);
    };

    function onAoeAttack(event, entity) {
        var damageReceived = 0;
        var damageKeys = Object.keys(event.damage);
        for (var i = 0; i < damageKeys.length; i++)
            damageReceived += event.damage[damageKeys[i]];
        new EntityDamagedEvent(event.spellCast, entity, event.damage, damageReceived).notifyEntity(entity);
    }

    function onEntityMoved(event, handlingEntity) {
        if (handlingEntity !== event.entity) return;

        event.oldTile.eventHandlers.unsubscribe(handlingEntity, AoeDamageEvent);
        event.newTile.eventHandlers.subscribe(handlingEntity, {class: AoeDamageEvent, handler: onAoeAttack.bind(this)});
    }

    return Defender;
});