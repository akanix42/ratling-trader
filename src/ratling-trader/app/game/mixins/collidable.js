define(function (require) {
    'use strict';
    var IntentToMove = require('game/intents/intent-to-move');
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityMovedEvent = require('game/events/entity-moved');

    function Collidable() {
        AbstractMixin.apply(this);

        this.addIntentHandler(IntentToMove, this.intentToMoveHandler);
        this.addEntityEventHandler(EntityMovedEvent, this.onEntityMoved.bind(this));
    }

    Collidable.prototype = Object.create(AbstractMixin.prototype);

    Collidable.prototype.intentToMoveHandler = function intentToMoveHandler(intent) {
        if (intent.entity.characteristics.has('collidable'))
            return self;
    };

    Collidable.prototype.applyTo = function applyTo(entity) {
        entity.characteristics.add('collidable');
        AbstractMixin.prototype.applyTo.call(this, entity);
    };

    Collidable.prototype.onEntityMoved = function onEntityMoved(event, handlingEntity) {
        if (handlingEntity !== event.entity) return;

        event.oldTile.intentHandlers.remove(handlingEntity, IntentToMove);
        event.newTile.intentHandlers.add(handlingEntity, {class: IntentToMove, handler: Collidable.prototype.intentToMoveHandler.bind(this)});
    };

    return Collidable;

});