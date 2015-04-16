define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');
    var AoeDamageEvent = require('game/events/aoe-damage-event');

    function ExplosionMixin() {
        AbstractMixin.apply(this);

        this.addEntityEventHandler(EntityDestroyedEvent, onDestroyed);

    }

    ExplosionMixin.prototype = Object.create(AbstractMixin.prototype);
    ExplosionMixin.prototype.applyTo = function init(entity) {
        entity.act = act.bind(this, entity);
        entity._private.scheduler.addEntity(entity);
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    return ExplosionMixin;


    function act(entity) {
        var aoeDamageEvent = new AoeDamageEvent(entity, {fire: 5});
        aoeDamageEvent.notifyTile(entity.tile);

        entity.destroy();
    }

    function onDestroyed(event) {
        event.target._private.scheduler.removeEntity(event.target);
    }
});