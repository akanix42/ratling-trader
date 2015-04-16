define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EventPerceivedEvent, AbstractEvent);
    return EventPerceivedEvent;

    function EventPerceivedEvent(event, entity, tile) {
        this.event = event;
        this.entity = entity;
        this.tile = tile;
    }
});