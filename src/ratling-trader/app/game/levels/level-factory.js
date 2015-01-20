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
            return new Level({width: 20, height: 20}, this._private.tileFactory);

        function restoreLevel() {
            return new Level(levelData.size, self._private.tileFactory);
        }
    };

    return LevelFactory;
});
