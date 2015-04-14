define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');

    function AiMixin() {
        AbstractMixin.apply(this);

        this.addEntityEventHandler(EntityDestroyedEvent, onDestroyed);

    }

    AiMixin.prototype = Object.create(AbstractMixin.prototype);
    AiMixin.prototype.applyTo = function init(entity) {
        entity.act = act.bind(this, entity);
        entity._private.scheduler.addEntity(entity);
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    return AiMixin;


    function act(entity) {
        entity._private.stateMachine.execute(entity);
    }

    function onDestroyed(event) {
        event.target._private.scheduler.removeEntity(event.target);
    }
});