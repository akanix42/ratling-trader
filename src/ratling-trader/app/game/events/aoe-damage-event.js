define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');

    function AoeDamageEvent(spellCast, damage) {
        this.spellCast = spellCast;
        this.damage = damage;
    }

    inheritance.inheritPrototype(AoeDamageEvent, AbstractEvent);

    return AoeDamageEvent;
});