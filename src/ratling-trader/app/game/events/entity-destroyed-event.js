define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityDestroyedEvent, AbstractEvent);
    return EntityDestroyedEvent;

    function EntityDestroyedEvent(attacker, target, attack) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
    }
});