define(function (require) {
    'use strict';
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var PlayerInitializedEvent = require('game/events/player-initialized-event');
    var ReadyForPlayerInputEvent = require('game/events/ready-for-player-input-event');
    var FovUpdatedEvent = require('game/events/fov-updated-event');
    var EventPerceivedEvent = require('game/events/event-perceived-event');

    function PlayerMixin(gameEventHub, entityFactory) {
        AbstractMixin.apply(this);

        this._private.gameEventHub = gameEventHub;
        this._private.entityFactory = entityFactory;
        this.addEntityEventHandler(FovUpdatedEvent, onFovUpdated);

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

    function onFovUpdated(event, entity) {
        var previousPreviousFov = entity.data.previousFov || {};
        var previousFov = entity.data.previousFov = entity.data.currentFov || {};
        var currentFov = entity.data.currentFov = entity.tilesInFov;
        //var newFovTiles = getNewFovTiles(previousPreviousFov, previousFov, currentFov);

        unsubscribeFromOldTiles(entity, previousPreviousFov, previousFov, currentFov);
        subscribeToNewTiles.call(this, entity, previousPreviousFov, previousFov, currentFov);

        //event.currentFovUpdates = newFovTiles;
        this._private.gameEventHub.notify(event);
    }

    function unsubscribeFromOldTiles(entity, previousPreviousFov, previousFov, currentFov) {
        var tilesInPreviousPreviousFov = Object.keys(previousPreviousFov);
        var level = entity.tile.level;

        for (var i = 0; i < tilesInPreviousPreviousFov.length; i++) {
            var key = tilesInPreviousPreviousFov[i];
            if (!(key in previousFov) && !(key in currentFov))
                level.getTileAtPosition(previousPreviousFov[key]).eventHandlers.unsubscribeFromAny(entity);
        }
    }

    function subscribeToNewTiles(entity, previousPreviousFov, previousFov, currentFov) {
        var tilesInCurrentFov = Object.keys(currentFov);
        var level = entity.tile.level;
        //var newTiles = [];
        for (var i = 0; i < tilesInCurrentFov.length; i++) {
            var key = tilesInCurrentFov[i];
            if (!(key in previousFov) && !(key in previousPreviousFov)) {
                level.getTileAtPosition(currentFov[key]).eventHandlers.subscribeToAny(entity, onEventPerceived.bind(this));
                //newTiles.push(currentFov[key]);
            }
        }
        //return;
    }

    function onEventPerceived(event, subscriber, entity, tile) {
        this._private.gameEventHub.notify(new EventPerceivedEvent(event, entity, tile));
    }
});