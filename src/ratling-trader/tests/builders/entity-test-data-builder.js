define(function (require) {
    var Entity = require('game/entities/entity');
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    function EntityTestDataBuilder(injector) {
        this.levelTestDataBuilder = new LevelTestDataBuilder(injector);
    }

    EntityTestDataBuilder.prototype.atPosition = function atPosition(position) {
        var level = this.levelTestDataBuilder.create();
        var entity = new Entity({type: 'test', tile: level.getTileAt(position.x, position.y)}, new MixinMapFactory());

        return entity;
    };
    EntityTestDataBuilder.prototype.atTile = function atTile(tile) {
        var entity = new Entity({type: 'test', tile: tile}, new MixinMapFactory());

        return entity;
    };

    return EntityTestDataBuilder;

});