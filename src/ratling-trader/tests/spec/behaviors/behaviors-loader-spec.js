define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var AttackEnemy = require('game/behaviors/attack-enemy');
    var AttackCommand = require('game/commands/attack-command');
    var iocLoader = require('ioc-loader');
    var behaviorsJSON = require('json!config/behaviors.json');

    describe('behaviors - load check', function () {
        it('should load all behaviors into memory', function test(done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var injector = roots.gameRoot.injector;
                var start = new Date();
                var behaviorsLoader = injector.resolve('loadedBehaviors');
                var behaviorsList = Object.keys(behaviorsJSON);

                for (var i = 0; i < behaviorsList.length; i++) {
                    console.log('Checking load of behavior: ' + behaviorsList[i]);
                    var behavior = behaviorsLoader.get(behaviorsList[i]);
                    behavior.should.be.ok();
                    behavior.execute.should.be.ok();
                }
                done();
            });
        });
    });
});