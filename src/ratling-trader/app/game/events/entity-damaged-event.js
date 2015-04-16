define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityDamagedEvent, AbstractEvent);
    return EntityDamagedEvent;

    function EntityDamagedEvent(attacker, target, attack, damageReceived) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
        this.damage = damageReceived;
    }
});