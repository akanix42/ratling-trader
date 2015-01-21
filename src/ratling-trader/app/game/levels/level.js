define(function () {
    function Level(size, tileFactory) {
        var map = new Array(size.width);
        for (var x = 0; x < size.width; x++) {
            var column = new Array(size.height);
            map[x] = column;
            for (var y = 0; y < size.height; y++)
                column[y] = tileFactory.create(this, {x: x, y: y}, 'dirtFloor');
        }

        this._private = {
            map: map,
            size: size,
            nullTile: tileFactory.nullTile
        };

    }

    Level.prototype = {
        get tiles() {
            return this._private.map.slice();
        },
        getTileAt: function getTileAt(x, y) {
            if (x < 0 || y < 0 || x >= this.size.width || y >= this.size.height)
                return this._private.nullTile;
            return this._private.map[x][y];
        },
        get size() {
            return this._private.size;
        },
        getRandomTile: function getRandomTile() {
            var x = ROT.RNG.getUniformInt(0, this.size.width - 1);
            var y = ROT.RNG.getUniformInt(0, this.size.height - 1);
            return this._private.map[x][y];
        }
    };

    return Level;
});