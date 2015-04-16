define(function (require) {
    'use strict';
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var IntentToAttack = require('game/intents/intent-to-attack');
    var CastSpellCommand = require('game/commands/cast-spell-command');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var FireballSpell = require('game/spells/fireball-spell');

    var attackNormalizers = {
        strength: 10,
        dexterity: 10
    };

    function Spellcaster(entityFactory) {
        AbstractMixin.apply(this);
        this._private.entityFactory = entityFactory;

        this.addCommandHandler(CastSpellCommand, castSpell);
    }

    Spellcaster.prototype = Object.create(AbstractMixin.prototype);
    Spellcaster.prototype.applyTo = function init(entity) {
        AbstractMixin.prototype.applyTo.call(this, entity);
    };

    function castSpell(command, caster) {
        var spell = new FireballSpell(this._private.entityFactory);
        return spell.cast(caster, command.target);
        //    var objections = caster.intentHandlers.notify(new IntentToCast(caster, spell)),
        //        caster
        //.
        //    intentHandlers.notify;
        //    if (objections.length)
        //        return false;
        //
        //    if (isInRange(attacker, target)) {
        //        window.rat.logger.log('attack!');
        //        var attack = attackWithMainHand(attacker);
        //        var attackEvent = new EntityAttackedEvent(attacker, target, attack);
        //        target.eventHandlers.notify(attackEvent);
        //        //target.eventHandlers.notify(attackEvent);
        //
        //        return true;
        //    }
        //    return false;

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

    return Spellcaster;
});