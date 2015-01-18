define(function (require) {
    'use strict';
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var RandomMapGenerator = require('game/maps/random-map-generator');
    var TileFactory = require('tests/builders/tile-factory');
    var EntityFactory = require('tests/builders/tile-factory');
    var MixinMapFactory = require('game/mixins/mixin-map-factory');

    describe('a randomly generated map', function () {
        it('should be full of tiles', function test() {
            var level = new LevelTestDataBuilder().create();
            var randomMapGenerator = new RandomMapGenerator(new TileFactory(new EntityFactory(new MixinMapFactory())));
            var map = randomMapGenerator.create(level);
            for (var x = 0, width = map.length; x < width; x++) {
                var row = map[x];
                for (var y = 0, height = map.length; y < height; y++) {
                    row[y].should.be.ok();
                }
            }

        });

    });
});