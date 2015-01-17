define(function (require) {
    var Entity = require('game/entities/new-entity');
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    function EntityTestDataBuilder() {
        this.levelTestDataBuilder = new LevelTestDataBuilder();
    }

    //
    //EntityTestDataBuilder.prototype.create = function create() {
    //    var entity = new Entity(this.tileTestDataBuilder.createNullTile());
    //
    //    return entity;
    //};

    EntityTestDataBuilder.prototype.atPosition = function atPosition(position) {
        var level = this.levelTestDataBuilder.create();
        var entity = new Entity(level.getTileAt(position.x, position.y), new MixinMapFactory());

        return entity;
    };
    EntityTestDataBuilder.prototype.atTile = function atTile(tile) {
        var entity = new Entity(tile, new MixinMapFactory());

        return entity;
    };

    return EntityTestDataBuilder;

});