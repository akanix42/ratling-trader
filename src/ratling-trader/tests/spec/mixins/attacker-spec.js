define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var Attacker = require('game/mixins/attacker');
    var AttackCommand = require('game/commands/attack-command');
    var IntentToAttack = require('game/intents/intent-to-attack');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var iocLoader = require('ioc-loader');

    describe('mixins - attacker', function () {
        it('should notify the target entity\'s tile of the intent to attack', function test(done) {
            var attackerPosition = {x: 5, y: 5};
            var defenderPosition = {x: 4, y: 5};
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var attacker = new EntityTestDataBuilder(roots.gameRoot.injector).atPosition(attackerPosition);
                var level = attacker.tile.level;
                var defender = new EntityTestDataBuilder(roots.gameRoot.injector).atTile(level.getTileAt(defenderPosition.x, defenderPosition.y));
                defender.tile.intentHandlers.add(null, {class: IntentToAttack, handler: attackIntentHandler});

                var attackCommand = new AttackCommand(defender.tile.position);
                attacker.mixins.add('attacker');

                var start = new Date();
                attacker.commandHandlers.notify(attackCommand, attacker);

                function attackIntentHandler(intent, handlingEntity) {
                    intent.attacker.should.equal(attacker);
                    intent.target.should.equal(defender);
                    done(start);
                }
            });
        });
        it('should notify the target entity of the attack', function test(done) {
            var attackerPosition = {x: 5, y: 5};
            var defenderPosition = {x: 4, y: 5};
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var attacker = new EntityTestDataBuilder(roots.gameRoot.injector).atPosition(attackerPosition);
                var level = attacker.tile.level;
                var defender = new EntityTestDataBuilder(roots.gameRoot.injector).atTile(level.getTileAt(defenderPosition.x, defenderPosition.y));
                defender.eventHandlers.subscribe(null, {class: EntityAttackedEvent, handler: attackEventHandler});

                var attackCommand = new AttackCommand(defender.tile.position);
                attacker.mixins.add('attacker');

                var start = new Date();

                attacker.commandHandlers.notify(attackCommand, attacker);

                function attackEventHandler(event, handlingEntity) {
                    event.attacker.should.equal(attacker);
                    event.target.should.equal(defender);
                    event.attack.should.be.ok();
                    done(start);
                }
            });
        });
    });
});