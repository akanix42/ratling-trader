define(function (require) {
    var Game = require('game/game');
    var EntityFactory = require('game/entities/entity-factory');
    var LevelFactory = require('game/levels/level-factory');
    var TileFactory = require('game/tiles/tile-factory');
    var IntentHandlersFactory = require('game/intents/intent-handlers-factory');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    function GameTestDataBuilder() {

    }

    GameTestDataBuilder.prototype = {
        withBridge: function (gameToUiBridge) {
            var entityFactory = new EntityFactory(new MixinMapFactory());
            var levelFactory = new LevelFactory(new TileFactory(new IntentHandlersFactory()));
            return new Game(gameToUiBridge, levelFactory, entityFactory);
        }
    };

    return GameTestDataBuilder;
});