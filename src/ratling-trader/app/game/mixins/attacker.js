define(function (require) {
    var stringFormat = require('stringformat'),
        attackCommand = require('game/commands/attack-command'),
        attackEvent = require('game/events/attack-event'),
        attackCompletedEvent = require('game/events/attack-completed-event');

    return attacker;

    function attacker(logger, mixinFactory) {
        var mixin = mixinFactory.get();
        mixin.addCommand(attackCommand, attack);
        mixin.addEvent(attackCompletedEvent, afterAttack);
        return mixin;

        function attack(target) {
            var self = this;
            if (isInRange()) {
                logger.log('attack!');
                var attack = {
                    damage: 1
                };
                var attackEvent = attackEvent(self, target, attack);
                target.raiseEvent(attackEvent);

                afterAttack(attackEvent);
                return true;
            }
            return false;

            function isInRange() {
                var attackerPosition = self.getPositionManager().getPosition(),
                    targetPosition = target.getPositionManager().getPosition();
                return getDistance(attackerPosition.x, attackerPosition.y, targetPosition.x, targetPosition.y) === 1;
            }

            function getDistance(x1, y1, x2, y2) {
                return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
            }
        }

        function afterAttack(attack) {
            if (attack.wasSuccessful)
                logger.log(stringFormat('{source.getType} hit {target.getType}', attack));
            else
                logger.log(stringFormat('{attack.source.getType} missed {attack.target.getType}'));

        }

    }
});