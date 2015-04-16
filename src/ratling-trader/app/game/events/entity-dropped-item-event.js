define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityDroppedItemEvent, AbstractEvent);
    return EntityDroppedItemEvent;

    function EntityDroppedItemEvent(item) {
        this.item = item;
    }
});