define(function () {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var PlayerInitializedEvent = require('game/events/player-initialized-event');

    function PlayerMixin(gameEventHub) {
        AbstractMixin.apply(this);

        this._private.gameEventHub = gameEventHub;
    }

    PlayerMixin.prototype = Object.create(AbstractMixin.prototype);
    PlayerMixin.prototype.applyTo = function init(entity) {
        this._private.gameEventHub.notify(new PlayerInitializedEvent(entity));
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    return PlayerMixin;
});