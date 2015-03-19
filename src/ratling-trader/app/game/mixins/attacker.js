define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var IntentToAttack = require('game/intents/intent-to-attack');
    var AttackCommand = require('game/commands/attack-command');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    'use strict';

    function Attacker() {
        AbstractMixin.apply(this);

        this.addCommandHandler(AttackCommand);
    }

    Attacker.prototype = Object.create(AbstractMixin.prototype);

    Attacker.prototype.execute = function execute(command, attacker) {
        var airSpace = attacker.tile.level.getTileAt(command.target.x, command.target.y).entities.airSpace;
        var target = airSpace[airSpace.length - 1];
        if (!target)
            return false;
        var objections = target.tile.intentHandlers.notify(new IntentToAttack(attacker, target));
        if (objections.length)
            return false;

        if (isInRange(attacker, target)) {
            window.rat.logger.log('attack!');
            var attack = {
                damage: 1
            };
            var attackEvent = new EntityAttackedEvent(attacker, target, attack);
            target.eventHandlers.notify(attackEvent);
            //target.eventHandlers.notify(attackEvent);

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

    };

    return Attacker;
});