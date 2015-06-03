define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');

    function SpellMixin() {
        AbstractMixin.apply(this);

        this.addEntityEventHandler(EntityDestroyedEvent, onDestroyed);
    }

    SpellMixin.prototype = Object.create(AbstractMixin.prototype);
    SpellMixin.prototype.applyTo = function init(entity) {
        entity.act = act.bind(this, entity);
        entity._private.scheduler.addEntity(entity);
        AbstractMixin.prototype.applyTo.call(this, entity);
    };

    SpellMixin.prototype.fromDto = function fromDto(){
        
    };

    return SpellMixin;


    function act(entity) {
        entity._private.data.spell.act(entity);
    }

    function onDestroyed(event) {
        event.target._private.scheduler.removeEntity(event.target);
    }
});