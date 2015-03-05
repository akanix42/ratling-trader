define(function (require) {
    var Level = require('game/levels/level');

    function LevelTestDataBuilder(injector) {
        this.tileFactory = injector.resolve('tileFactory');
        this.levelFactory = injector.resolve('levelFactory');
    }

    LevelTestDataBuilder.prototype.create = function create() {
        var size = {width: 20, height: 20};

        return this.levelFactory.create({size:size});
    };

    return LevelTestDataBuilder;

});