define(function (require) {
    var ROT = require('rot');
    return AttackEnemy;

    function AttackEnemy() {
        var target;

        return {execute: attackEnemy};

        function attackEnemy(self) {
            if (getTarget())
                return self.raiseEvent('attack', target);

            return false;

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