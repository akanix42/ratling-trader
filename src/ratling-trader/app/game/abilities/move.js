define(function (require) {

    return Move;

    function Move(logger, name) {
        var self = this;

        self.addAbility(name, execute);

        function execute(dX, dY) {
            var newTile = self.getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
        }

    }
});