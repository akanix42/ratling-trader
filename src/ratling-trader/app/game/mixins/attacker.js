define(function (require) {
    var stringFormat = require('stringformat');
    return AttackEnemy;

    function AttackEnemy(logger) {
        return {attack: attack, attackComplete: attackComplete};

        function attack(target) {
            var source = this;
            if (isInRange()) {
                logger.log('attack!');
                target.raiseEvent('attacked', {
                    damage: 1,
                    source: source,

                });
                //target.takeDamage();
                return true;
            }
            return false;

            function isInRange() {
                return getDistance(source.getPositionManager().getPosition().x, source.getPositionManager().getPosition().y, target.getPositionManager().getPosition().x, target.getPositionManager().getPosition().y) === 1;
            }

            function getDistance(x1, y1, x2, y2) {
                return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
            }
        }

        function attackComplete(attack) {
            if (attack.wasSuccessful)
                logger.log(stringFormat('{source.getType} hit {target.getType}', attack));
            else
                logger.log(stringFormat('{attack.source.getType} missed {attack.target.getType}'));

        }

    }
});