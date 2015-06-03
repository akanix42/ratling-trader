define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var AttackEnemy = require('game/behaviors/generic-attacking');
    var AttackCommand = require('game/commands/attack-command');
    var iocLoader = require('ioc-loader');

    describe('behaviors - generic attacking', function () {
        it('should target and attack a nearby enemy', function test(done) {
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
                attacker.commandHandlers.subscribe(null, {class: AttackCommand, handler: attackCommandHandler});

                var start = new Date();
                var behavior = new AttackEnemy();
                behavior.execute(attacker);
                attacker.data.target.should.equal(defender);

                function attackCommandHandler(event) {
                    event.target.should.equal(defender.tile.position);
                    done(start);
                }
            });
        });
    });
});