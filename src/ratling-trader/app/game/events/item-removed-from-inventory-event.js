define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(ItemRemovedFromInventoryEvent, AbstractEvent);
    return ItemRemovedFromInventoryEvent;

    function ItemRemovedFromInventoryEvent(item, entity) {
        this.item = item;
        this.entity = entity;
    }
});