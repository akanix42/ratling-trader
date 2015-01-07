"use strict";
define(function (require) {
    var stringformat = require('stringformat'),
        extend = require('lib/extend/extend'),
        attackEvent = require('game/events/attack-event'),
        attackCompletedEvent = require('game/events/attack-completed-event');
    return Destructible;

    function Destructible(logger, mixinFactory) {
        var mixin = mixinFactory.get();
        mixin.addEvent(attackEvent, attacked);
        return mixin;

        return {attacked: attacked};

        function attacked(event) {
            var self = this;
            var target = event.target;
            if (target !== self)
                return;

            takeDamage(event.attack);

            function takeDamage(attack) {
                var attackResult = extend({target: target}, attack);
                logger.log(stringformat('ouch: {damage} ', attack));

                target.getAttributes().get('health').updateCurrent(-attack.damage);
                var remainingHealth = target.getAttributes().get('health').getCurrent();
                logger.log(stringformat('health remaining: {health}', {health: remainingHealth}));

                if (remainingHealth <= 0)
                    target.kill();

                attack.result = true;
                attackResult.wasSuccessful = true;
                //attack.source.eventHub.broadcast(attackCompletedEvent('attackComplete', attackResult));
            }

        }

    }
});