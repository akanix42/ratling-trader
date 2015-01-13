"use strict";

define(function (require) {
  var ROT = require("rot");
  return MoveTowardTarget;

  function MoveTowardTarget() {
    var target;

    return { execute: move };

    function move(self) {
      if (getTarget()) return self.eventHub.broadcast("move", getStepTowardsTarget());

      return false;

      function getStepTowardsTarget() {
        var currentPosition = self.getPositionManager().getPosition();
        var targetPosition = target.getPositionManager().getPosition();
        return {
          x: normalizeDirection(currentPosition.x, targetPosition.x),
          y: normalizeDirection(currentPosition.y, targetPosition.y) };
      }

      function normalizeDirection(source, destination) {
        var step = destination - source;
        if (step === 0) return 0;
        return step / Math.abs(step);
      }

      function getTarget() {
        return target || (target = findTarget());
      }

      function findTarget() {
        var neighboringTiles = self.getPositionManager().getTile().getNeighbors(4).randomize();
        for (var i = 0; i < neighboringTiles.length; i++) {
          var tile = neighboringTiles[i];
          if (tile.getCreature() && tile.getCreature().getType() === "player") return tile.getCreature();
        }
      }
    }
  }
});