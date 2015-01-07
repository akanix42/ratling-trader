define(function (require) {
    var stringFormat = require('stringformat'),
        extend = require('lib/extend/extend'),
        afterPlaceEvent = require('game/events/after-place-event');
    ;

    return Level;

    function Level(data, entityFactory, scheduler, logger) {
        var self = this,
            entities = {},
            map = data.map,
            width = map.tiles.length,
            height = map.tiles[0].length;

        for (var x = 0; x < width; x++)
            for (var y = 0; y < height; y++)
                map.tiles[x][y].setMap(self);

        exposePublicMethods();

        processCreatures();
        processItems();

        function exposePublicMethods() {
            self.addEntity = addEntity;
            self.removeEntity = removeEntity;
            self.getTile = getTile;
            self.getWidth = getWidth;
            self.getHeight = getHeight;
            self.getAdjacentTiles = getAdjacentTiles;
            self.getRandomTile = getRandomTile;
        }

        function processCreatures() {
            for (var i = 0; i < data.creatures.length; i++) {
                data.creatures[i] = processCreature(data.creatures[i])
            }
        }

        function processCreature(creature) {
            creature = entityFactory.get(creature);
            creature.getPositionManager().setLevel(self);
            creature.getPositionManager().setTile(getRandomTile({architectures: ['stoneFloor']}));

            creature.eventHub.broadcast(afterPlaceEvent(creature, creature.getPositionManager().getTile()));
            return creature;
        }

        function processItems() {
            var entities = data.items;
            for (var i = 0; i < entities.length; i++) {
                entities[i] = processItem(entities[i])
            }
        }

        function processItem(entity) {
            entity = entityFactory.get(entity);
            entity.getPositionManager().setLevel(self);
            entity.getPositionManager().setTile(getTile(5,6));

            return entity;
        }

        function addEntity(entity) {
            if (entities[entity.getId()])
                return;
            logger.log(stringFormat('adding {getId}', entity));
            scheduler.addEntity(entity);
            entities[entity.getId()] = entity;

        }

        function removeEntity(entity) {
            scheduler.removeEntity(entity);
            entities[entity.getId()] = null;

        }

        function getTile(x, y) {
            if (x < 0 || x >= width || y < 0 || y >= height) {
                return map.nullTile;
            } else {
                return map.tiles[x][y] || map.nullTile;
            }
        }

        function getRandomTile(filter) {
            var defaultFilter = {
                architectures: []
            };
            if (filter !== undefined)
                filter = extend({}, defaultFilter, filter);

            var tile;
            do {
                var x = Math.floor(Math.random() * width);
                var y = Math.floor(Math.random() * height);
                tile = getTile(x, y);
            } while (!matchesFilter(tile));

            return tile;

            function matchesFilter(tile) {
                if (filter === undefined)
                    return true;

                var type = tile.getArchitecture().getType();
                for (var i = 0; i < filter.architectures.length; i++)
                    if (filter.architectures[i] === type)
                        return true;
            }
        }

        function getWidth() {
            return width;
        }

        function getHeight() {
            return height;
        }

        function getAdjacentTiles(position) {
            var adjacentTiles = [];
            for (var x = Math.max(position.x - 1, 0); x < Math.min(position.x + 2, width); x++)
                for (var y = Math.max(position.y - 1, 0); y < Math.min(position.y + 2, height); y++)
                    if (!(x === position.x && y === position.y))
                        adjacentTiles.push(getTile(x, y));

            return adjacentTiles;
        }
    }
});
