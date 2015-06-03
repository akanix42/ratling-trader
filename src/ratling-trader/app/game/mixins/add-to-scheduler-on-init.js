define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');

    function AddToSchedulerOnInit() {
        AbstractMixin.apply(this);
    }

    AddToSchedulerOnInit.prototype = Object.create(AbstractMixin.prototype);

    AddToSchedulerOnInit.prototype.applyTo = function init(entity) {
        entity._private.scheduler.addEntity(entity);
        AbstractMixin.prototype.applyTo.call(this, entity);
    };

    return AddToSchedulerOnInit;

});