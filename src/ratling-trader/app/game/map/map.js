define(function (require) {
    var ROT = require('rot');
    return Constructor;

    function Constructor(tiles, nullTile) {
        var self = this;

        var width = tiles.length,
            height = tiles[0].length;
        for (var x = 0; x < width; x++)
            for (var y = 0; y < height; y++)
                tiles[x][y].setMap(self);

        self.getTile = getTile;
        self.getWidth = getWidth;
        self.getHeight = getHeight;
        self.getAdjacentTiles = getAdjacentTiles;

        function getTile(x, y) {
            if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                return nullTile;
            } else {
                return tiles[x][y] || nullTile;
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