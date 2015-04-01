define(function (require) {
    var Entity = require('game/entities/entity');
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    function EntityTestDataBuilder(injector) {
        this.injector = injector;
        this.levelTestDataBuilder = new LevelTestDataBuilder(injector);
    }

    EntityTestDataBuilder.prototype.create = function create() {
        return this.atPosition({x: 0, y: 0});
    };

    EntityTestDataBuilder.prototype.atPosition = function atPosition(position) {
        var level = this.levelTestDataBuilder.create();
        var entityFactory = this.injector.resolve('entityFactory');
        var entity = entityFactory.create({
            type: 'test',
            attributes: {
                health: {base: 1},
                "sight-range": {
                    "base": 5
                }
            },
            tile: level.getTileAt(position.x, position.y),
            space: 'air',

        });
        entity.mainHand = entityFactory.create({type: 'fist'});

        return entity;
    };
    EntityTestDataBuilder.prototype.atTile = function atTile(tile) {
        var entityFactory = this.injector.resolve('entityFactory');
        var entity = entityFactory.create({type: 'test', tile: tile, space: 'air'});

        return entity;
    };

    return EntityTestDataBuilder;

});