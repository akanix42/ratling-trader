define(function (require) {

    return Move;

    function Move() {
        var self = this;

        self.move = move;

        function move(dX, dY) {
            var newTile = self.getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
        }

    }
});