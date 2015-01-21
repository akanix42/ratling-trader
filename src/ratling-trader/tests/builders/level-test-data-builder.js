define(function (require) {
    var Level = require('game/levels/level');

    function LevelTestDataBuilder(injector) {
        this.tileFactory = injector.resolve('tileFactory');
    }

    LevelTestDataBuilder.prototype.create = function create() {
        var size = {width: 20, height: 20};

        return new Level(size, this.tileFactory);
    };

    return LevelTestDataBuilder;

});