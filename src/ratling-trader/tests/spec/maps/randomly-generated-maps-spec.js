define(function (require) {
    'use strict';
    var LevelTestDataBuilder = require('tests/builders/level-test-data-builder');
    var iocLoader = require('ioc-loader');

    describe('a randomly generated map', function () {
        it('should be full of tiles', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var level = new LevelTestDataBuilder(roots.gameRoot.injector).create();
                var randomMapGenerator = roots.gameRoot.injector.resolve('randomMapGenerator');
                var map = randomMapGenerator.create(level);
                for (var x = 0, width = map.length; x < width; x++) {
                    var row = map[x];
                    for (var y = 0, height = map.length; y < height; y++) {
                        row[y].should.be.ok();
                    }
                }
                done();
            });
        });

    });
});