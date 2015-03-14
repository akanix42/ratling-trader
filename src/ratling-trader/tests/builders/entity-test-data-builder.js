define(function (require) {
    var Entity = require('game/entities/entity');
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    function EntityTestDataBuilder(injector) {
        this.injector = injector;
        this.levelTestDataBuilder = new LevelTestDataBuilder(injector);
    }

    EntityTestDataBuilder.prototype.atPosition = function atPosition(position) {
        var level = this.levelTestDataBuilder.create();
        var entityFactory = this.injector.resolve('entityFactory');
        var entity = entityFactory.create({type: 'test', tile: level.getTileAt(position.x, position.y)});

        return entity;
    };
    EntityTestDataBuilder.prototype.atTile = function atTile(tile) {
        var entityFactory = this.injector.resolve('entityFactory');
        var entity = entityFactory.create({type: 'test', tile: tile});

        return entity;
    };

    return EntityTestDataBuilder;

});