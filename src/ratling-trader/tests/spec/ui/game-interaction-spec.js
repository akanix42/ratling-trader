define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var stringformat = require('stringformat');
    var arrayExtensions = require('array-extensions');

    'use strict';
    describe('ui - interacting with a game', function () {
        it('should move the player in response to the arrow keys', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var positions = [
                {x: 1, y: 1, key: ROT.VK_LEFT},
                {x: 0, y: 1, key: ROT.VK_UP},
                {x: 0, y: 0, key: ROT.VK_RIGHT},
                {x: 1, y: 0, key: ROT.VK_DOWN},
                {x: 1, y: 1},
            ];

            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                var originalSavedGameFactory = gameRoot.injector.resolve('savedGameFactory');
                gameRoot.injector.register('savedGameFactory', getTestSavedGameFactory(originalSavedGameFactory, getTestGameData()));
                uiRoot.injector.register('display', new TestDisplay(drawCallback));
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
                return ui.screens.currentScreen.loadGame()
                    .then(function () {
                        var positionIndex = 0;
                        ui.uiBridge.eventHandlers.subscribe(null, {
                            class: ReadyForPlayerInputEvent,
                            handler: testPosition
                        });

                        testPosition();

                        function testPosition() {
                            //console.log('positionIndex: ' + positionIndex);
                            var expectedPosition = positions[[positionIndex++]];
                            var playerPosition = ui.uiBridge._private.gameBridge._private.game.player.tile.position;
                            //console.log(stringformat('playerPosition: {x}, {y}', playerPosition));
                            //console.log(stringformat('expectedPosition: {x}, {y}', expectedPosition));
                            playerPosition.x.should.equal(expectedPosition.x, "the player should have moved to the expected location.");
                            playerPosition.y.should.equal(expectedPosition.y, "the player should have moved to the expected location.");

                            if (positionIndex === positions.length)
                                done();
                            else
                                ui.screens.currentScreen.handleInput('keydown', {keyCode: expectedPosition.key});
                        }
                    });

            });

            function drawCallback(x, y, character) {
            }

            function getTestGameData() {
                var data = {
                    currentLevel: 0,
                    levels: [getLevel()]
                };
                return data;


                function getLevel() {
                    var level = {
                        tiles: [
                            [getTile(), getTile()],
                            [getTile(), getTile([getPlayer()])]
                        ], hasBeenCreated: true
                    };
                    level.size = {
                        width: level.tiles.length,
                        height: level.tiles[0].length
                    };
                    return level;

                    function getPlayer() {
                        return {
                            type: 'player'
                        };
                    }

                    function getTile(entities) {
                        return {
                            baseArchitecture: {type: 'dirtFloor'},
                            entities: entities
                        };
                    }
                }
            }

            function getTestSavedGameFactory(originalSavedGameFactory, testGameData) {
                function TestSavedGameFactory() {

                }

                TestSavedGameFactory.prototype.create = function create(gameToUiBridge) {
                    return originalSavedGameFactory.create(gameToUiBridge, testGameData);
                };

                return TestSavedGameFactory;
            }

        });
        it('should attack the occupying entity if the player would move onto an occupied tile', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                var originalSavedGameFactory = gameRoot.injector.resolve('savedGameFactory');
                gameRoot.injector.register('savedGameFactory', getTestSavedGameFactory(originalSavedGameFactory, getTestGameData()));
                uiRoot.injector.register('display', new TestDisplay());
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function (ui) {
                return ui.screens.currentScreen.loadGame()
                    .then(function () {
                        var start = new Date();
                        var player = ui.uiBridge._private.gameBridge._private.game.player;
                        var target = player.tile.getNeighbor({y: -1}).entities.airSpace.last();
                        target.eventHandlers.subscribe(null, {class: EntityAttackedEvent, handler: verifyAttack});

                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_UP});

                        function verifyAttack() {
                            done(start);
                        }

                    });
            });

            function getTestGameData() {
                var data = {
                    currentLevel: 0,
                    levels: [getLevel()]
                };
                return data;


                function getLevel() {
                    var level = {
                        tiles: [
                            [getTile(), getTile()],
                            [getTile([getMonster()]), getTile([getPlayer()])]
                        ], hasBeenCreated: true
                    };
                    level.size = {
                        width: level.tiles.length,
                        height: level.tiles[0].length
                    };
                    return level;

                    function getPlayer() {
                        return {
                            type: 'player'
                        };
                    }

                    function getMonster() {
                        return {
                            "name": "test",
                            "type": "monster",
                            "mixins": [
                                "collidable",
                                "destructible"
                            ],
                            space: 'air',
                            "attributes": {
                                "health": {base:10}
                            }
                        };
                    }

                    function getTile(entities) {
                        return {
                            baseArchitecture: {type: 'dirtFloor'},
                            entities: entities
                        };
                    }
                }
            }

            function getTestSavedGameFactory(originalSavedGameFactory, testGameData) {
                function TestSavedGameFactory() {

                }

                TestSavedGameFactory.prototype.create = function create(gameToUiBridge) {
                    return originalSavedGameFactory.create(gameToUiBridge, testGameData);
                };

                return TestSavedGameFactory;
            }

        });
    });
});