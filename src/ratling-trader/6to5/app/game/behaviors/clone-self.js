"use strict";

define(function (require) {
  var ROT = require("rot");

  return CloneSelf;

  function CloneSelf(entityFactory) {
    return { execute: cloneSelf };

    function cloneSelf(self) {
      var openTile = getAvailableTile();
      if (!openTile) return false;
      var clone = {
        type: self.getType()
      };
      clone = entityFactory.get(clone);
      clone.getPositionManager().setLevel(self.getPositionManager().getLevel());
      clone.getPositionManager().setTile(openTile);
      self.getPositionManager().getLevel().addEntity(clone);


      function getAvailableTile() {
        var neighboringTiles = self.getPositionManager().getTile().getNeighbors(1).randomize();
        for (var tileIndex = 0; tileIndex < neighboringTiles.length; tileIndex++) {
          var tile = neighboringTiles[tileIndex];
          if (!tile.getCreature() && tile.isWalkable()) return tile;
        }
        return false;
      }
    }
  }

});