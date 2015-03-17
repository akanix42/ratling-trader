define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var Destructible = require('game/mixins/destructible');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var iocLoader = require('ioc-loader');

    describe('mixins - destructible', function () {
        it('should be a valid mixin', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var loadedMixins = roots.gameRoot.injector.resolve('loadedMixins');
                var start = new Date();

                var mixin = loadedMixins.get('destructible');
                should.not.equal(mixin, undefined);
                done(start);

            });
        });
        it('should subscribe to attack events', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var destructible = new EntityTestDataBuilder(roots.gameRoot.injector).create();

                var start = new Date();

                destructible.mixins.add('destructible');

                (EntityAttackedEvent.name in destructible.eventHandlers._private.events).should.be.true();
                done(start);
            });
        });
        it('should take damage from the attack', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var destructible = new EntityTestDataBuilder(roots.gameRoot.injector).create();
                destructible.attributes.get('health').current.should.equal(1);

                destructible.mixins.add('destructible');
                var start = new Date();

                destructible.eventHandlers.notify(new EntityAttackedEvent(destructible, destructible, {damage: 1}));
                destructible.attributes.get('health').current.should.equal(0);
                done(start);
            });
        });
    });
});