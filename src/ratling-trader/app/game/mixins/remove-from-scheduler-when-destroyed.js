define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');

    function RemoveFromSchedulerWhenDestroyed() {
        AbstractMixin.apply(this);

        this.addEntityEventHandler(EntityDestroyedEvent, onDestroyed);
    }

    RemoveFromSchedulerWhenDestroyed.prototype = Object.create(AbstractMixin.prototype);

    return RemoveFromSchedulerWhenDestroyed;

    function onDestroyed(event) {
        event.target._private.scheduler.removeEntity(event.target);
    }
});