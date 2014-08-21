define(function (require) {

    return Constructor;

    function Constructor(entityFactory) {
        var self = this;

        self.execute = execute;

        function execute(creature, ability) {
            var openTile = getAvailableTile();
            if (!openTile)
                return false;
            var clone = {
                type: creature.getType()
            };
            clone = entityFactory.get(clone);
            clone.setLevel(creature.getLevel());
            clone.setTile(openTile);
            creature.getLevel().addEntity(clone);


            function getAvailableTile() {
                var adjacentTiles = creature.getLevel().getMap().getAdjacentTiles(creature.getPosition());
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