define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var EntityDamagedEvent = require('game/events/entity-damaged-event');
    var iocLoader = require('ioc-loader');

    describe('mixins - defender', function () {
        it('should be a valid mixin', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var loadedMixins = roots.gameRoot.injector.resolve('loadedMixins');
                var start = new Date();

                var mixin = loadedMixins.get('defender');
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
                var defender = new EntityTestDataBuilder(roots.gameRoot.injector).create();

                var start = new Date();

                defender.mixins.add('defender');

                (EntityAttackedEvent.name in defender.eventHandlers._private.events).should.be.true();
                done(start);
            });
        });
        it('should fire off a damaged event if it is damaged', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var defender = new EntityTestDataBuilder(roots.gameRoot.injector).create();
                defender.mixins.add('defender');
                defender.eventHandlers.subscribe(null, {class: EntityDamagedEvent, handler: eventHandler});
                var start = new Date();
                new EntityAttackedEvent(defender, defender, {physicalDamage: 1}).notifyEntity(defender);

                function eventHandler() {
                    done(start);
                }
            });
        });
        it('should pass through all the damage when there are no resistances', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var defender = new EntityTestDataBuilder(roots.gameRoot.injector).create();
                defender.mixins.add('defender');
                defender.eventHandlers.subscribe(null, {class: EntityDamagedEvent, handler: eventHandler});
                var start = new Date();

                new EntityAttackedEvent(defender, defender, {physicalDamage: 1}).notifyEntity(defender);

                function eventHandler(event) {
                    event.damage.should.equal(1);
                    done(start);
                }
            });
        });
    });
});