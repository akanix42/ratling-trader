define(function (require) {
    var Map = require('game/map/map'),
        EntityType = require('enums/entity-type'),
        ROT = require('rot');

    return Constructor;

    function Constructor(tileFactory) {
        var self = this;
        var mapWidth = 500,
            mapHeight = 500;
        self.get = get;

        function get() {
            var tiles = generateCaveMap();
            var map = new Map(tiles);
            return map;
        }


        function generateCaveMap() {
            var tiles = createEmptyMap();
            var generator = new ROT.Map.Cellular(mapWidth, mapHeight);
            generator.randomize(0.5);

            var totalIterations = 3;
            for (var i = 0; i < totalIterations - 1; i++)
                generator.create();
            generator.create(updateMapTile);

            return tiles;

            function updateMapTile(x, y, type) {
                tiles[x][y] = type === 1
                    ? tileFactory.get(EntityType.stoneFloor)
                    : tileFactory.get(ROT.RNG.getUniform() < 0.4 ? EntityType.stoneWall : EntityType.dirtWall);
            }
        }

        function createEmptyMap() {
            var tiles = [];
            var nullTile = tileFactory.get(EntityType.null);
            for (var x = 0; x < mapWidth; x++) {
                tiles.push([]);
                for (var y = 0; y < mapHeight; y++)
                    tiles[x].push(nullTile);
            }

            return tiles;
        }
    }

});