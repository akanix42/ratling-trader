"use strict";
Game.registerUnique("tile", Tile);

function Tile(id, x, y, baseArchitecture) {
    this.x = x;
    this.y = y;
    this.level = null;
    this.baseArchitecture = baseArchitecture;
    this.id = id;
    this.channel = "tile." + id;
}
Tile.prototype.getNeighbor = function getNeighbor(direction) {
    return this.level.getTileAt(this.position.x + (direction.x || 0), this.position.y + (direction.y || 0));
};
Tile.prototype.getNeighbors = function getNeighbors(distance) {
    var x = this.position.x;
    var y = this.position.y;
    var tiles = [];
    for (var i = 1; i <= distance; i++)
        getTilesAtDistance(i, x, y, this.level, tiles);

    return tiles;
};
