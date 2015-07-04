Game.registerSingleton("randomMapGenerator", RandomMapGenerator);
function RandomMapGenerator(idGenerator) {
    this.idGenerator = idGenerator;
}

RandomMapGenerator.prototype.get =
    function createMap(size) {
        var idGenerator = this.idGenerator;
        var Tile = Game.getType("tile");
        var tiles = createEmptyMap(size.width, size.height);
        var generator = new ROT.Map.Cellular(size.width, size.height);
        generator.randomize(0.5);

        var totalIterations = 3;
        for (var i = 0; i < totalIterations - 1; i++)
            generator.create();
        generator.create(updateMapTile);

        return tiles;


        function updateMapTile(x, y, type) {
            tiles[x][y] = new Tile(idGenerator.getNextId(Tile.typeName), x, y, getBaseArchitecture(type));
        }
    };

function getBaseArchitecture(type) {
    if (type === 1)
        return 'stoneFloor';
    if (ROT.RNG.getUniform() < 0.4)
        return 'stoneWall';

    return 'dirtWall';
}

function createEmptyMap(width, height) {
    var map = new Array(width);
    for (var x = 0; x < width; x++)
        map[x] = new Array(height);
    return map;
}
