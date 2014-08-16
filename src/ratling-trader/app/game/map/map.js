define(function (require) {

    return Constructor;

    function Constructor(tiles, nullTile) {
        var self = this;

        var width = tiles.length,
            height = tiles[0].length;
        self.getTile = getTile;
        self.getWidth = getWidth;
        self.getHeight = getHeight;

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
    }
});