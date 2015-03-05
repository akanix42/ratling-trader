define(function (require) {
    var Level = require('game/levels/level');

    function LevelFactory(tileFactory) {
        this._private = {
            tileFactory: tileFactory
        };
    }

    LevelFactory.prototype.create = function create(levelData) {
        var self = this;
        if (levelData)
            return restoreLevel();
        else
            return createNewLevel();

        function restoreLevel() {
            return new Level(levelData, self._private.tileFactory);
        }


        function createNewLevel() {
            var data = {size: {width: 20, height: 20}};
            var size = data.size;
            var map = new Array(size.width);
            for (var x = 0; x < size.width; x++) {
                var column = new Array(size.height);
                map[x] = column;
                for (var y = 0; y < size.height; y++)
                    column[y] = {type: 'dirtFloor'};
            }
            data.tiles = map;
            return new Level(data, self._private.tileFactory);

        }
    };


    return LevelFactory;
});
