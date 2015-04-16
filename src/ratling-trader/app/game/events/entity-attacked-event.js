define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityAttackedEvent, AbstractEvent);

    return EntityAttackedEvent;

    function EntityAttackedEvent(attacker, target, attack) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
    }
});