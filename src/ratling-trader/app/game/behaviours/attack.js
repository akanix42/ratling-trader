define(function (require) {

    return Attack;

    function Attack(logger) {
        var self = this;
        var name = 'Attack';

        self.addBehaviour(name, execute);

        function execute(dX, dY) {
            var newTile = self.getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
        }

    }
});