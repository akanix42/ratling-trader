define(function (require) {
    return position;

    function position(entity, initialLevel, initialTile) {
        var tile = initialTile,
            level = initialLevel;

        return {
            getLevel: getLevel,
            setLevel: setLevel,

            getTile: getTile,
            setTile: setTile,

            getPosition: getPosition,
            setPosition: setPosition,
        };

        function setLevel(newLevel) {
            removeFromCurrentLevel();
            level = newLevel;
            if (level)
                level.addEntity(entity);
        }

        function removeFromCurrentLevel() {
            if (level)
                level.removeEntity(entity);
        }

        function getLevel() {
            return level;
        }

        function getTile() {
            return tile;
        }

        function getPosition() {
            return tile.getPosition();
        }

        function setPosition(x, y) {
            var newTile = level.getMap().getTile(x, y);
            setTile(newTile);
        }

        function setTile(newTile) {
            removeFromCurrentTile();
            if (!newTile)
                return;
            tile = newTile;
            tile.setCreature(entity);
        }

        function removeFromCurrentTile() {
            if (tile && tile.getCreature() === entity)
                tile.setCreature(null);
            tile = null;
        }

    }
});