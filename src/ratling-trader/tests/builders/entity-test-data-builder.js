define(function(require) {
    var Entity = require('game/entities/new-entity');
    var TileTestDataBuilder = require('tests/builders/tile-test-data-builder');

    function EntityTestDataBuilder() {
        this.tileTestDataBuilder = new TileTestDataBuilder();
    }

    EntityTestDataBuilder.prototype.create = function create() {
        var entity = new Entity(this.tileTestDataBuilder.createNullTile());

        return entity;
    };

    EntityTestDataBuilder.prototype.atPosition = function atPosition(position) {
        var entity = new Entity(this.tileTestDataBuilder.withPosition(position));

        return entity;
    };

    return EntityTestDataBuilder;

});