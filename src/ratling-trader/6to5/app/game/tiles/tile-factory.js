"use strict";

define(function (require) {
  var Tile = require("game/tiles/tile");

  var nullTile = null;

  return TileFactory;


  function TileFactory(entityFactory, eventHubFactory, intentHubFactory) {
    var self = this;
    self.get = get;
    self.getNull = getNull;

    function get(initialArchitecture, data) {
      return new Tile(initialArchitecture, data, entityFactory, eventHubFactory.get(), intentHubFactory.get());
    }

    function getNull() {
      return nullTile || (nullTile = get(entityFactory.getNull(), { position: { x: 0, y: 0 } }));
    }
  }
});