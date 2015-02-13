define(function (require) {
    'use strict';
    var IntentToMove = require('game/intents/intent-to-move'),
        AbstractMixin = require('game/mixins/abstract-mixin');

    function Collidable() {
        AbstractMixin.apply(this);

        this.addIntentHandler(IntentToMove, this.intentToMoveHandler);
    }

    Collidable.prototype = Object.create(AbstractMixin.prototype);

    Collidable.prototype.intentToMoveHandler = function intentToMoveHandler(handlingEntity, intent) {
        if (intent.entity.characteristics.has('collidable'))
            return self;
    };

    return Collidable;

});