NewGameFactory.$inject = ['world', 'zoneFactory'];
NewGameFactory.typeName = "newGameFactory";

function NewGameFactory(world, zoneFactory) {
    this.world = world;
    this.zoneFactory = zoneFactory;
}

NewGameFactory.prototype.get = function (player) {
    var firstZone = this.zoneFactory.get();
    this.world.addZone(firstZone);
    player.setTile(firstZone.levels[0].tiles[5][5]);

    return this.world;
};

ZoneFactory.typeName = "zoneFactory";

function ZoneFactory() {

}

ZoneFactory.prototype.get = function () {
    var biome = "test";
    var firstLevel = createLevel(biome);
    var zone = [];
    zone.push(firstLevel);

    return zone;
};
function createLevel(biome) {
    var levelData = generateLevelData(biome);
    var level = new Level();
    level.tiles = levelData.tiles;
    level.portals = levelData.portals;

    return level;
}

Tile.typeName = "tile";
JSONC.register(Tile);
function Tile(x, y) {
    this.x = x;
    this.y = y;
}

var width = 20, height = 20;
function generateLevelData() {
    var tiles = [];
    var portals = [];

    for (var x = 0; x < width; x++) {
        var arr = tiles[x] = new Array(height);
        for (var y = 0; y < height; y++)
            arr[y] = new Tile(x, y);
    }
    return {tiles: tiles, portals: portals};
}
