define(function () {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var PlayerInitializedEvent = require('game/events/player-initialized-event');

    function PlayerMixin(game, gameEventHub) {
        AbstractMixin.apply(this);

        this._private.game = game;
        this._private.gameEventHub = gameEventHub;
    }

    PlayerMixin.prototype = Object.create(AbstractMixin.prototype);
    PlayerMixin.prototype.init = function init() {
        this._private.gameEventHub.notify(new PlayerInitializedEvent(this));
    };
    return PlayerMixin;
});