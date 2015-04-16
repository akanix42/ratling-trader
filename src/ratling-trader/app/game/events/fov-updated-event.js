define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(FovUpdatedEvent, AbstractEvent);
    return FovUpdatedEvent;

    function FovUpdatedEvent() {
    }
});