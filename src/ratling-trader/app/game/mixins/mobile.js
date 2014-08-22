define(function (require) {

    return Move;

    function Move() {
        return {move: move};

        function move(dX, dY) {
            var self = this;
            if (dX === 0 && dY === 0)
                return;
            var newTile = self.getPositionManager().getTile().getNeighbor(dX, dY);
            if (newTile.isWalkable())
                self.getPositionManager().setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
            else
                return false;
        }

    }
});