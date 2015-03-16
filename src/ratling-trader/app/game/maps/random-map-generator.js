define(function (require) {
    var ROT = require('rot');

    function RandomMapGenerator(tileFactory) {
        this._private = {
            tileFactory: tileFactory
        };
    }

    RandomMapGenerator.prototype = {
        create: function createMap(level) {
            var tileFactory = this._private.tileFactory;
            var tiles = createEmptyMap(level.size.width, level.size.height);
            var generator = new ROT.Map.Cellular(level.size.width, level.size.height);
            generator.randomize(0.5);

            var totalIterations = 3;
            for (var i = 0; i < totalIterations - 1; i++)
                generator.create();
            generator.create(updateMapTile);

            return tiles;

            function updateMapTile(x, y, type) {
                tiles[x][y] = tileFactory.create({level: level, position: {x: x, y: y}, baseArchitecture: getBaseArchitecture(type)});

                function getBaseArchitecture(type) {
                    if (type === 1)
                        return 'stoneFloor';
                    if (ROT.RNG.getUniform() < 0.4)
                        return 'stoneWall';

                    return 'dirtWall';
                }
            }
        }
    };
    return RandomMapGenerator;

    function createEmptyMap(width, height) {
        var map = new Array(width);
        for (var x = 0; x < width; x++)
            map[x] = new Array(height);
        return map;
    }
});