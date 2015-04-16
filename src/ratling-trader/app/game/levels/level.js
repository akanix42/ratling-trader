define(function () {
    function Level(data, tileFactory) {
        var size = {
            width: data.tiles.length,
            height: data.tiles[0].length
        };

        this._private = {
            size: size,
            nullTile: tileFactory.nullTile,
            fov: new ROT.FOV.PreciseShadowcasting(this.checkIfLightPasses.bind(this)),
            isInitialized: false

        };

        this._private.map = initializeMap(size, data.tiles, tileFactory, this);
        calculateEntitiesFov(this._private.map);
        this._private.isInitialized = true;
    }

    function initializeMap(size, tiles, tileFactory, level) {
        var map = new Array(size.width);

        for (var x = 0; x < size.width; x++) {
            var column = new Array(size.height);
            map[x] = column;
            for (var y = 0; y < size.height; y++) {
                var tileData = tiles[x][y];
                tileData.level = level;
                tileData.position = {x: x, y: y};
                column[y] = tileFactory.create(tileData);
            }
        }

        return map;
    }

    function calculateEntitiesFov(map) {
        for (var x = 0; x < map.length; x++) {
            var column = map[x];
            for (var y = 0; y < column.length; y++) {
                var entities = column[y].entities.all();
                for (var i = 0; i < entities.length; i++)
                    entities[i].calculateFov();
            }
        }
    }

    Level.prototype = {
        get isInitialized() {
            return this._private.isInitialized;
        },
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
        getTileAtPosition: function getTileAt(position) {
            return this.getTileAt(position.x, position.y);
        },
        toDto: function toDto() {
            var level = this;
            return {
                tiles: saveTiles(level._private.map)
            };
        }
    };

    return Level;

    function saveTiles(tiles) {
        var tilesDto = [];
        for (var x = 0; x < tiles.length; x++) {
            var column = tiles[x];
            for (var y = 0; y < column.length; y++)
                tilesDto.push(column[y].toDto());
        }

        return tilesDto;
    }

});