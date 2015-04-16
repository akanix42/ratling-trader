define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(PlayerInitializedEvent, AbstractEvent);
    return PlayerInitializedEvent;

    function PlayerInitializedEvent(player) {
        this.player = player;

        AbstractEvent.call(this);

    }
});