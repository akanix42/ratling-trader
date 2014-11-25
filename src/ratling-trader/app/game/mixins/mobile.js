define(function (require) {

    return Move;

    function Move() {
        return {move: move};

        function move(dX, dY) {
            var self = this;
            if (dX instanceof Object)
            {
                dY = dX.y;
                dX = dX.x;
            }
            dX = Math.floor(dX);
            dY = Math.floor(dY);

            if (dX === 0 && dY === 0)
                return;

            var newTile = self.getPositionManager().getTile().getNeighbor(dX, dY);
            if (attack())
                return;

            if (newTile.getCreature())
                self.raiseEvent('attack')
            else if (newTile.isWalkable())
                self.getPositionManager().setTile(newTile);
            else if (newTile.isDiggable())
                newTile.dig();
            else
                return false;


            function attack() {
                if (newTile.getCreature())
                    return self.raiseEvent('attack', newTile.getCreature());
                return false;
            }
        }

    }
});