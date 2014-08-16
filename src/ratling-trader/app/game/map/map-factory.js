define(function (require) {
    var Map = require('game/map/map'),
        TileType = require('enums/tile-type'),
        ROT = require('rot');

    return Constructor;

    function Constructor(tileFactory) {
        var self = this;

        self.get = get;

        function get() {
            var tiles = generateCaveMap();
            var map = new Map(tiles);
            return map;
        }


        function generateCaveMap() {
            var tiles = createEmptyMap();
            var generator = new ROT.Map.Cellular(80, 24);
            generator.randomize(0.5);

            var totalIterations = 3;
            for (var i = 0; i < totalIterations - 1; i++)
                generator.create();
            generator.create(updateMapTile);

            return tiles;

            function updateMapTile(x, y, type) {
                tiles[x][y] = type === 1
                    ? tileFactory.get(TileType.Floor)
                    : tileFactory.get(TileType.Wall);
            }
        }

        function createEmptyMap() {
            var tiles = [];
            var nullTile = tileFactory.get(TileType.Null);
            for (var x = 0; x < 80; x++) {
                tiles.push([]);
                for (var y = 0; y < 24; y++)
                    tiles[x].push(nullTile);
            }

            return tiles;
        }
    }

});