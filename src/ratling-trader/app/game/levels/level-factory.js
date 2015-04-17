define(function (require) {
    var Level = require('game/levels/level');

    function LevelFactory(tileFactory, entityFactory, nullTile) {
        this._private = {
            tileFactory: tileFactory,
            entityFactory: entityFactory,
            nullTile: nullTile
        };
    }

    LevelFactory.prototype.create = function create(levelData) {
        var self = this;
        if (levelData && levelData.hasBeenCreated)
            return restoreLevel.call(this);
        else
            return createNewLevel.call(this);

        function restoreLevel() {
            return new Level(self._private.tileFactory, self._private.nullTile).init(levelData);
        }


        function createNewLevel() {
            var data = (levelData && levelData.size) ? levelData : {size: {width: 20, height: 20}};
            var size = data.size;
            var map = new Array(size.width);
            var allTiles = [];
            for (var x = 0; x < size.width; x++) {
                var column = new Array(size.height);
                map[x] = column;
                for (var y = 0; y < size.height; y++) {
                    column[y] = {baseArchitecture: {type: 'dirtFloor'}, entities: []};
                    allTiles.push(column[y]);
                }
            }
            data.allTiles = allTiles;
            data.tiles = map;
            settleLevel.call(this, data);

            return new Level(self._private.tileFactory, self._private.nullTile).init(data);
        }

        function settleLevel(level) {
            var monsterDensity = 0.5;
            var tiles = level.allTiles.slice();
            var numberOfMonstersToCreate = monsterDensity * tiles.length;
            for (var i = 0; i < numberOfMonstersToCreate; i++) {
                var nextTileIndex = ROT.RNG.getUniformInt(0, tiles.length - 1);
                var tile = tiles.splice(nextTileIndex, 1)[0];
                tile.entities.push(getMonster.call(this));
            }
        }

        function getMonster() {
            return {type: 'zombie'};
        }
    };


    return LevelFactory;
});
