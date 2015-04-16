define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var Destructible = require('game/mixins/destructible');
    var EntityDamagedEvent = require('game/events/entity-damaged-event');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');
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
        it('should subscribe to damaged events', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var destructible = new EntityTestDataBuilder(roots.gameRoot.injector).create();

                var start = new Date();

                destructible.mixins.add('destructible');

                (EntityDamagedEvent.name in destructible.eventHandlers._private.events).should.be.true();
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
                new EntityDamagedEvent(destructible, destructible, null, 1).notifyEntity(destructible);
                destructible.attributes.get('health').current.should.equal(0);
                done(start);
            });
        });
        it('should fire off a destroyed event to it\'s tile when it is destroyed', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var destructible = new EntityTestDataBuilder(roots.gameRoot.injector).create();
                destructible.attributes.get('health').current.should.equal(1);

                destructible.mixins.add('destructible');
                destructible.tile.eventHandlers.subscribe(null, {class: EntityDestroyedEvent, handler: eventHandler});
                var start = new Date();

                new EntityDamagedEvent(destructible, destructible, null, 1).notifyEntity(destructible);

                function eventHandler(event) {
                    done(start);
                }
            });
        });
        it('should replace the entity with the destroyed version of itself once destroyed', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var destructible = new EntityTestDataBuilder(roots.gameRoot.injector).create();
                var tile = destructible.tile;
                destructible.attributes.get('health').current.should.equal(1);
                destructible._private.data.corpse = 'zombie-corpse';

                destructible.mixins.add('destructible');
                destructible.tile.eventHandlers.subscribe(null, {class: EntityDestroyedEvent, handler: eventHandler});
                var start = new Date();

                new EntityDamagedEvent(destructible, destructible, null, 1).notifyEntity(destructible);

                function eventHandler(event) {
                    var corpse = tile.entities.all().reverse()[0];
                    corpse.type.should.equal('zombie-corpse');
                    corpse.was.should.equal(destructible);
                    done(start);
                }
            });
        });
    });
});