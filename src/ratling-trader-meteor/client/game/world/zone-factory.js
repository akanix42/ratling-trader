"use strict";
Game.registerSingleton("zoneFactory", ZoneFactory);

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
    var Level = Game.getType("level");
    var levelData = generateLevelData(biome);
    var level = new Level();
    level.tiles = levelData.tiles;
    level.portals = levelData.portals;

    return level;
}
var width = 20, height = 20;

function generateLevelData() {
    var Tile = Game.getType("tile");
    var tiles = [];
    var portals = [];

    for (var x = 0; x < width; x++) {
        var arr = tiles[x] = new Array(height);
        for (var y = 0; y < height; y++)
            arr[y] = new Tile(x, y);
    }
    return {tiles: tiles, portals: portals};
}

