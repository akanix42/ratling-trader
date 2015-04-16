define(function (require) {
    var AbstractEvent = require('game/events/abstract-event');
    var inheritance = require('helpers/inheritance');
    inheritance.inheritPrototype(GameInitializedEvent, AbstractEvent);
    return GameInitializedEvent;

    function GameInitializedEvent(game) {
        this.game = game;
    }
});