define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(DroppedItemsEvent, AbstractEvent);

    function DroppedItemsEvent(entity, items) {
        this.entity = entity;
        this.items = items;
    }

    return DroppedItemsEvent;
});