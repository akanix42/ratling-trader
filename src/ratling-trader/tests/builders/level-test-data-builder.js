define(function (require) {
    var Level = require('game/levels/level');
    var TileFactory = require('game/tiles/tile-factory');
    var IntentHandlersFactory = require('game/intents/intent-handlers-factory');

    function LevelTestDataBuilder() {
        this.tileFactory = new TileFactory(new IntentHandlersFactory());
    }

    LevelTestDataBuilder.prototype.create = function create() {
        var size = {width: 20, height: 20};

        return new Level(size, this.tileFactory);
    };

    return LevelTestDataBuilder;

});