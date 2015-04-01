define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var PlayerInitializedEvent = require('game/events/player-initialized-event');
    var ReadyForPlayerInputEvent = require('game/events/ready-for-player-input-event');

    function PlayerMixin(gameEventHub, entityFactory) {
        AbstractMixin.apply(this);

        this._private.gameEventHub = gameEventHub;
        this._private.entityFactory = entityFactory;
    }

    PlayerMixin.prototype = Object.create(AbstractMixin.prototype);
    PlayerMixin.prototype.applyTo = function init(entity) {
        entity.act = act.bind(entity, this);
        entity._private.scheduler.addEntity(entity);
        entity.mainHand = this._private.entityFactory.create({type: 'fist'});
        this._private.gameEventHub.notify(new PlayerInitializedEvent(entity));
        AbstractMixin.prototype.applyTo.call(this, entity);
    };
    return PlayerMixin;


    function act(mixin) {
        this._private.scheduler.pause();
        mixin._private.gameEventHub.notify(new ReadyForPlayerInputEvent());
    }


});