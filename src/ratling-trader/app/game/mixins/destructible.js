define(function (require) {
    var stringformat = require('stringformat'),
        extend = require('lib/extend/extend');
    return Destructible;

    function Destructible(logger) {
        return {attacked: attacked};

        function attacked(attack) {
            var target = this;
            takeDamage(attack);

            function takeDamage(attack) {
                var attackResult = extend({target: target}, attack);
                logger.log(stringformat('ouch: {damage} ', attack));

                target.getAttributes().get('health').updateCurrent(-attack.damage);
                var remainingHealth = target.getAttributes().get('health').getCurrent();
                logger.log(stringformat('health remaining: {health}', {health: remainingHealth}));

                if (remainingHealth <= 0)
                    target.kill();

                attackResult.wasSuccessful = true;
                attack.source.raiseEvent('attackComplete', attackResult);
            }

        }

    }
});