define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(EntityNoLongerOnTileEvent, AbstractEvent);
    return EntityNoLongerOnTileEvent;

    function EntityNoLongerOnTileEvent() {
    }
});