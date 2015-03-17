define(function (require) {
    var iocLoader = require('ioc-loader');

    var EntityFactory = require('game/entities/entity-factory');
    describe('models - entity', function () {
        it('should instantiate the attributes', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
                var entityFactory = roots.gameRoot.injector.resolve('entityFactory');
                var entity = entityFactory.create({attributes: [{name: 'a', base: 1}]});

                entity.attributes.get('a').base.should.equal(1);
                done();
            });
        });
    });
});