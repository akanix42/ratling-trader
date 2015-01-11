define(function (require) {
    var attackCommand = require('game/commands/attack-command');
    return AttackEnemy;

    function AttackEnemy() {
        return {execute: attackEnemy};

        function attackEnemy(self) {
            var target = getTarget();
            if (target)
                return self.perform(attackCommand(self, target));

            return false;

            function getTarget() {
                return verifyTarget() || searchForTargetInNearbyTiles();
            }

            function verifyTarget() {
                var target = self.getData('target');
                if (target.state === 'creature')
                    return target;

                self.setData('target', null);
            }

            function searchForTargetInNearbyTiles() {
                var neighboringTiles = self.getPositionManager().getTile().getNeighbors(4).randomize();
                for (var i = 0; i < neighboringTiles.length; i++) {
                    var target = searchTileForTarget(neighboringTiles[i]);
                    if (target !== undefined)
                        return target;
                }
            }

            function searchTileForTarget(tile) {
                var creatures = tile.getCreatures();
                for (var i = 0; i < creatures.length; i++) {
                    var creature = creatures[i];
                    if (creature.getType() === 'player')
                        return creature;
                }
            }
        }

    }
});