define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');

    function AiMixin() {
        AbstractMixin.apply(this);
    }

    AiMixin.prototype = Object.create(AbstractMixin.prototype);
    AiMixin.prototype.applyTo = function init(entity) {
        entity.act = act.bind(entity, this);
        entity._private.scheduler.addEntity(entity);
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    return AiMixin;


    function act() {
        decideOnAction(this);
    }

    function decideOnAction(entity) {
        for (var i = 0; i < entity.behaviors.length; i++) {
            var behavior = entity.behaviors[i];
            if (behavior.probability >= ROT.RNG.getUniform() && behavior.execute(self))
                return;
        }
    }

function initBehaviors(){

}
});