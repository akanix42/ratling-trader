define(function (require) {

    return AttackEnemy;

    function AttackEnemy(logger) {
        var self = this;

        self.execute = execute;

        function execute(entity) {
            var newTile = self.getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
        }

    }
});