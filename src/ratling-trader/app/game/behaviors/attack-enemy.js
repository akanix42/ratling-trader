define(function (require) {
    var ROT = require('rot');
    return AttackEnemy;

    function AttackEnemy() {
        var target = null;

        return {execute: attackEnemy};

        function attackEnemy(self) {
            if (getTarget())
                return self.raiseEvent('attack', target);

            return false;

            function getTarget() {
                return verifyTarget() || (target = findTarget());
            }

            function verifyTarget() {
                return target
                    ? (target.state === 'dead' ? (target = null) : target)
                    : target;
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