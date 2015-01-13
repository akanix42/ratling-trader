"use strict";

define(function (require) {
  var MoveIntent = require("game/intents/move-intent"),
      MoveEvent = require("game/events/after-move-event"),
      PlaceEvent = require("game/events/after-place-event");

  return collidable;

  function collidable(mixinFactory) {
    var mixin = mixinFactory.get();
    mixin.addEvent(PlaceEvent, afterPlace);
    mixin.addEvent(MoveEvent, afterMove);
    mixin.setInit(init);

    return mixin;

    function init(entity) {
      entity.setData("collidable", true);
    }

    function afterPlace(event) {
      var self = this;
      if (self !== event.entity) return;
      subscribeToTile(self, event.destination);
    }

    function afterMove(event) {
      var self = this;
      if (self !== event.entity) return;

      unsubscribeFromTile(self, event.origin);
      subscribeToTile(self, event.destination);
    }

    function unsubscribeFromTile(self, tile) {
      tile.intentHub.unsubscribe(self, MoveIntent);
    }

    function subscribeToTile(self, tile) {
      tile.intentHub.subscribe(self, MoveIntent, beforeTileMovedTo);
    }

    function beforeTileMovedTo(event) {
      var self = this;
      if (self === event.entity) return;
      if (event.entity.getData("collidable")) return self;
    }
  }
});