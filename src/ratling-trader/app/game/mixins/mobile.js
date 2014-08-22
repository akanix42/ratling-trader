define(function (require) {

    return Move;

    function Move() {
        return {move: move};

        function move(dX, dY) {
            var self = this;
            var newTile = self.getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
            else
                return false;
        }

    }
});