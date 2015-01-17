define(function (require) {
    var Level = require('game/levels/new-level');
    var TileFactory = require('tests/builders/tile-factory');
    var IntentHandlersFactory = require('game/intents/new-intent-handlers');

    function LevelTestDataBuilder() {
        this.tileFactory = new TileFactory(new IntentHandlersFactory());
    }

    LevelTestDataBuilder.prototype.create = function create() {
        var size = {x: 20, y: 20};

        return new Level(size, this.tileFactory);
    };

    return LevelTestDataBuilder;

});