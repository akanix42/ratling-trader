define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(ReadyForPlayerInputEvent, AbstractEvent);
    return ReadyForPlayerInputEvent;

    function ReadyForPlayerInputEvent() {
    }
});