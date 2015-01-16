define(function (require) {
    var Level = require('game/levels/new-level');
    var TileFactory = require('tests/builders/tile-factory');

    function LevelTestDataBuilder() {
this.tileFactory = new TileFactory();
    }

    LevelTestDataBuilder.prototype.create = function create() {
        var size = {x: 20, y: 20};

        return new Level(size, this.tileFactory);
    };

    return LevelTestDataBuilder;

});