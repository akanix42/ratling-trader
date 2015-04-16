define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityMovedEvent, AbstractEvent);
    return EntityMovedEvent;

    function EntityMovedEvent(entity, oldTile, newTile) {
        this.entity = entity;
        this.oldTile = oldTile;
        this.newTile = newTile;
    }
});