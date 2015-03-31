define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var stringformat = require('stringformat');
    var arrayExtensions = require('array-extensions');
    var ItemAddedToInventoryEvent = require('game/events/item-added-to-inventory-event');
    var ItemRemovedFromInventoryEvent = require('game/events/item-removed-from-inventory-event');
    var EntityDroppedItemEvent = require('game/events/entity-dropped-item-event');
    var DroppedItemsEvent = require('game/events/dropped-items-event');

    'use strict';
    describe('ui - interacting with a game', function () {
        it('player should move in response to the arrow keys', function (done) {
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

        it('player should attack the occupying entity if the player would move onto an occupied tile', function (done) {
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
                                "health": {base: 10}
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

        it('player should pick up the item lying on the tile when the "pick up" key is pressed', function (done) {
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
                        var item = player.tile.entities.floorSpace.last();
                        player.eventHandlers.subscribe(null, {class: ItemAddedToInventoryEvent, handler: verifyPickUp});

                        item.tile.should.equal(player.tile);

                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_COMMA});

                        function verifyPickUp(event) {
                            event.entity.should.equal(player);
                            event.item.should.equal(item);
                            event.item.should.equal(player.inventory.items[0]);

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
                            [getTile(), getTile([getPlayer(), getItem()])]
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

                    function getItem() {
                        return {
                            "name": "test",
                            "type": "item",
                            "mixins": [],
                            space: 'floor',
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

        });

        it('player should drop the item when the "drop" key sequence is pressed', function (done) {
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
                        var item = player.inventory.items[0];

                        player.eventHandlers.subscribe(null, {
                            class: DroppedItemsEvent,
                            handler: verifyDrop
                        });


                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_I});
                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_D, altKey: true});
                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_A});
                        ui.screens.currentScreen.handleInput('keydown', {keyCode: ROT.VK_RETURN});

                        function verifyDrop(event) {
                            event.items[0].should.equal(item);
                            item.tile.should.equal(player.tile);
                            player.tile.entities.floorSpace.last().should.equal(item);
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
                            type: 'player',
                            items: [
                                getItem()
                            ]
                        };
                    }

                    function getItem() {
                        return {
                            "name": "test",
                            "type": "item",
                            "mixins": [],
                            space: 'floor',
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

        });


    });

    function getTestSavedGameFactory(originalSavedGameFactory, testGameData) {
        function TestSavedGameFactory() {

        }

        TestSavedGameFactory.prototype.create = function create(gameToUiBridge) {
            return originalSavedGameFactory.create(gameToUiBridge, testGameData);
        };

        return TestSavedGameFactory;
    }

});