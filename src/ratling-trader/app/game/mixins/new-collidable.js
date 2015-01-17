define(function (require) {
    'use strict';
    var IntentToMove = require('game/intents/new-intent-to-move');

    function Collidable() {
        this._private = {
            intentHandlers: [],
        };
        this.addIntentHandler(IntentToMove, this.intentToMoveHandler);
    }

    Collidable.prototype = {
        addIntentHandler: function addEvent(EventClass, callback) {
            this._private.intentHandlers.push({class: EventClass, handle: callback})
        },
        applyTo: function applyTo(entity) {
            entity.setData('collidable', true);
        },
        intentToMoveHandler: function intentToMoveHandler(intent) {
            if (intent.entity.getData('collidable'))
                return self;
        }
    };

    return Collidable;

});