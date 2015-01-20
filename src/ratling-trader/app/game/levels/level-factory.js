define(function (require) {
    var Level = require('game/levels/level');

    function LevelFactory(tileFactory) {
        this._private = {
            tileFactory: tileFactory
        };
    }

    LevelFactory.prototype.create = function create() {
        return new Level({width: 20, height: 20}, this._private.tileFactory);
    };

    return LevelFactory;
});
