define(function (require) {

    return CloneSelf;

    function CloneSelf (entityFactory){
        return {execute: cloneSelf};

        function cloneSelf(self) {
            var openTile = getAvailableTile();
            if (!openTile)
                return false;
            var clone = {
                type: self.getType()
            };
            clone = entityFactory.get(clone);
            clone.setLevel(self.getLevel());
            clone.setTile(openTile);
            self.getLevel().addEntity(clone);


            function getAvailableTile() {
                var adjacentTiles = self.getLevel().getMap().getAdjacentTiles(self.getPosition());
                for (var tileIndex = 0; tileIndex < adjacentTiles.length; tileIndex++) {
                    var tile = adjacentTiles[tileIndex];
                    if (!tile.getCreature() && tile.isWalkable())
                        return tile;
                }
                return false;
            }
        }
    }


});