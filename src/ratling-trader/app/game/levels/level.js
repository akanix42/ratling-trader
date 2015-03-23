define(function () {
    function Level(data, tileFactory) {
        var size = {
            width: data.tiles.length,
            height: data.tiles[0].length
        };
        var map = new Array(size.width);
        for (var x = 0; x < size.width; x++) {
            var column = new Array(size.height);
            map[x] = column;
            for (var y = 0; y < size.height; y++) {
                var tileData = data.tiles[x][y];
                tileData.level = this;
                tileData.position = {x: x, y: y};
                column[y] = tileFactory.create(tileData);
            }
        }

        this._private = {
            map: map,
            size: size,
            nullTile: tileFactory.nullTile,
            fov: new ROT.FOV.PreciseShadowcasting(this.checkIfLightPasses.bind(this))

        };

    }

    Level.prototype = {
        get tiles() {
            return this._private.map.slice();
        },
        get size() {
            return this._private.size;
        },
        calculateFov: function calculateFov(x, y, radius) {
            var tilesInFov = {};
            var self = this;
            var clearSightDistance = radius * 0.667;
            if (radius === 0)
                return tilesInFov;

            this._private.fov.compute(x, y, radius, function recordVisibleTile(x, y, distance, visibility) {
                if (visibility === 0 || x < 0 || y < 0 || x >= self.size.width || y >= self.size.height)
                    return;

                if (distance > clearSightDistance)
                    visibility = (radius - distance) / (radius - clearSightDistance);
                tilesInFov[x + ',' + y] = {x: x, y: y, visibility: visibility};
            });

            return tilesInFov;
        },

        checkIfLightPasses: function checkIfLightPasses(x, y) {
            if (x < 0 || y < 0 || x >= this._private.map.length)
                return false;
            var column = this._private.map[x];
            if (y >= column.length)
                return false;
            return column[y].entities.architecture.passesLight;
        },
        getRandomTile: function getRandomTile() {
            var x = ROT.RNG.getUniformInt(0, this.size.width - 1);
            var y = ROT.RNG.getUniformInt(0, this.size.height - 1);
            return this._private.map[x][y];
        },
        getTileAt: function getTileAt(x, y) {
            if (x < 0 || y < 0 || x >= this.size.width || y >= this.size.height)
                return this._private.nullTile;
            return this._private.map[x][y];
        },
    };

    return Level;


})
;