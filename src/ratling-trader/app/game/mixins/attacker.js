define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var IntentToAttack = require('game/intents/intent-to-attack');
    var AttackCommand = require('game/commands/attack-command');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    'use strict';

    var attackNormalizers = {
        strength: 10,
        dexterity: 10
    };

    function Attacker(entityFactory) {
        AbstractMixin.apply(this);
        this._private.entityFactory = entityFactory;

        this.addCommandHandler(AttackCommand, attack);
    }

    Attacker.prototype = Object.create(AbstractMixin.prototype);
    Attacker.prototype.applyTo = function init(entity) {
        entity.mainHand = this._private.entityFactory.create({type: 'fist'});
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    function attack(command, attacker) {
        var airSpace = attacker.tile.level.getTileAt(command.target.x, command.target.y).entities.airSpace;
        var target = airSpace[airSpace.length - 1];
        if (!target)
            return false;
        var objections = target.tile.intentHandlers.notify(new IntentToAttack(attacker, target));
        if (objections.length)
            return false;

        if (isInRange(attacker, target)) {
            window.rat.logger.log('attack!');
            var attack = attackWithMainHand(attacker);
            var attackEvent = new EntityAttackedEvent(attacker, target, attack);
            attackEvent.notifyEntity(target);

            return true;
        }
        return false;

        function isInRange(attacker, target) {
            var range = 1;
            var attackerPosition = attacker.tile.position,
                targetPosition = target.tile.position;
            return getDistance(attackerPosition.x, attackerPosition.y, targetPosition.x, targetPosition.y) <= range;
        }

        function getDistance(x1, y1, x2, y2) {
            return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        }

        function attackWithMainHand() {
            var weapon = attacker.mainHand;
            var strengthModifier = (attacker.attributes.get('strength').current / attackNormalizers.strength);
            var dexterityModifier = (attacker.attributes.get('dexterity').current / attackNormalizers.dexterity);
            var physicalDamage = weapon.attributes.get('physicalDamage').current;
            physicalDamage *= strengthModifier;
            var toHit = weapon.attributes.get('toHit').current * dexterityModifier;

            return {
                physicalDamage: physicalDamage,
                toHit: toHit
            };
        }

    }

    return Attacker;
});