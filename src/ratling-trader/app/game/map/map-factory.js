define(function (require) {
    var Map = require('game/map/map'),
        ROT = require('rot');

    return Constructor;

    function Constructor(tileFactory, entityFactory) {
        var self = this;
        var mapWidth = 100,
            mapHeight = 80;
        self.get = get;
        var nullTile = tileFactory.get('null', {position: {x: 0, y: 0}});

        function get() {
            var tiles = generateCaveMap();
            var map = new Map(tiles, nullTile);
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
                    ? tileFactory.get(entityFactory.get('stoneFloor'), {position: {x: x, y: y}})
                    : tileFactory.get(ROT.RNG.getUniform() < 0.4 ? entityFactory.get('stoneWall') : entityFactory.get('dirtWall'), {position: {x: x, y: y}});
            }
        }

        function createEmptyMap() {
            var tiles = [];
            for (var x = 0; x < mapWidth; x++) {
                tiles.push([]);
                for (var y = 0; y < mapHeight; y++)
                    tiles[x].push(nullTile);
            }

            return tiles;
        }
    }

});