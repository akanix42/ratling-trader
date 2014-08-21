define(function (require) {

    return AttackEnemy;

    function AttackEnemy() {

        var target;
        return {execute: attackEnemy};

        function attackEnemy(self) {
            //entity.getLogger().log('attack!!!!');
            if (getTarget())
                return self.attack(target);

            return false;

            function getTarget() {
                return target || (target = findTarget());
            }

            function findTarget() {
                var neighboringTiles = self.getTile().getNeighbors(4);
                for (var i = 0; i < neighboringTiles.length; i++) {
                    var tile = neighboringTiles[i];
                    if (tile.getCreature() && tile.getCreature().getType() === 'player')
                        return tile.getCreature();
                }
            }
        }

    }
});