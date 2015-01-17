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
            this._private.intentHandlers.push({class: EventClass, handler: callback.bind(this)})
        },
        applyTo: function applyTo(entity) {
            entity.characteristics.add('collidable');
            for (var i = 0; i < this._private.intentHandlers.length; i++){
                var intentHandler = this._private.intentHandlers[i];
                entity.tile.intentHub.subscribe(entity, intentHandler);
            }
        },
        intentToMoveHandler: function intentToMoveHandler(handlingEntity, intent) {
            if (intent.entity.characteristics.has('collidable'))
                return self;
        }
    };

    return Collidable;

});