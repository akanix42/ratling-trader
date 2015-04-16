define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(ItemAddedToInventoryEvent, AbstractEvent);
    return ItemAddedToInventoryEvent;

    function ItemAddedToInventoryEvent(item, entity) {
        this.item = item;
        this.entity = entity;
    }
});