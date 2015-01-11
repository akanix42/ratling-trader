define(function (require) {
    return position;

    function position(entity, initialLevel, initialTile) {
        var tile = initialTile,
            previousTile,
            level = initialLevel;

        return {
            getLevel: getLevel,
            setLevel: setLevel,

            getTile: getTile,
            setTile: setTile,

            getPosition: getPosition,
            setPosition: setPosition,
            getLastKnownPosition: getLastKnownPosition,
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
            if (!tile)
                return null;
            return tile.getPosition();
        }

        function getLastKnownPosition() {
            var position = getPosition()
                || (previousTile
                    ? previousTile.getPosition()
                    : {x: -1, y: -1});
            return position;
        }

        function setPosition(x, y) {
            var newTile = level.getTile(x, y);
            setTile(newTile);
        }

        function setTile(newTile) {
            //if (newTile && newTile.getCreature() && newTile.getCreature() !== entity)
            //    return;
            if (!newTile)
                return;
            previousTile = tile;
            if (previousTile)
                previousTile.removeEntity(entity);

            //removeFromCurrentTile();
            tile = newTile;
            tile.addEntity(entity);

        }

        function removeFromCurrentTile() {
            if (tile)
                tile.removeEntity(entity);
            tile = null;
        }

    }
});