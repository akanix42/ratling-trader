define(function (require) {
    var ROT = require('rot'),
        stringformat = require('stringformat');
    return PathTowardTarget;

    function PathTowardTarget(stopwatch) {
        var target;

        return {execute: stopwatch.getExecutor(null, move)};

        function move(self) {
            if (getTarget()) {
                var nextStep = getStepTowardsTarget();
                if (nextStep)
                    return self.raiseEvent('move', nextStep);
            }

            return false;

            function getStepTowardsTarget() {
                var currentPosition = self.getPositionManager().getPosition();
                var targetPosition = target.getPositionManager().getPosition();
                var passableCallback = function (x, y) {
                    var tile = self.getPositionManager().getLevel().getTile(x, y);
                    return tile.isWalkable() || tile.isDiggable();
                };
                var astar = new ROT.Path.AStar(targetPosition.x, targetPosition.y, passableCallback, {topology: 8});

                var path = [];
                var pathCallback = function (x, y) {
                    path.push([x, y]);
                };
                astar.compute(currentPosition.x, currentPosition.y, pathCallback);
                path.shift();
                return path.length
                    ? {
                    x: normalizeDirection(currentPosition.x, path[0][0]),
                    y: normalizeDirection(currentPosition.y, path[0][1])
                }
                    : false;
            }

            function normalizeDirection(source, destination) {
                var step = destination - source;
                if (step === 0)
                    return 0;
                return step / Math.abs(step);
            }

            function getTarget() {
                return target || (target = findTarget());
            }

            function findTarget() {
                var neighboringTiles = self.getPositionManager().getTile().getNeighbors(4).randomize();
                for (var i = 0; i < neighboringTiles.length; i++) {
                    var tile = neighboringTiles[i];
                    if (tile.getCreature() && tile.getCreature().getType() === 'player')
                        return tile.getCreature();
                }
            }
        }

    }
});