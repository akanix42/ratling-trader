define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    'use strict';

    function Destructible() {
        AbstractMixin.apply(this);

        this.addEntityEventHandler(EntityAttackedEvent, this.onAttacked);
    }

    Destructible.prototype = Object.create(AbstractMixin.prototype);

    Destructible.prototype.onAttacked = function onAttacked(event) {
        var target = event.target;

        target.attributes.get('health').base -= event.attack.damage;
    };

    return Destructible;
});