define(function (require) {
    var TestDisplay = require('tests/helpers/test-display');
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');

    'use strict';
    describe('ui - interacting with a game', function () {
        it('should move the player in response to the arrow keys', function (done) {
            var mockDisplay = new TestDisplay(drawCallback);
            var positions = [
                {x: 1, y: 1, key: ROT.VK_LEFT},
                {x: 0, y: 1, key: ROT.VK_RIGHT},
                {x: 0, y: 0, key: ROT.VK_UP},
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
                ui.screens.currentScreen.loadGame();
                for (var i = 0; i < positions.length; i++) {
                    var expectedPosition = positions[i];
                    var playerPosition = ui.uiBridge._private.gameBridge._private.game.player.tile.position;
                    playerPosition.x.should.equal(expectedPosition.x);
                    playerPosition.y.should.equal(expectedPosition.y);
                    ui.screens.currentScreen.handleInput('keydown', expectedPosition.key);
                }
                done();

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
                        ]
                    };
                    level.size = {
                        width: level.tiles.length,
                        length: level.tiles[0].length
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
    });
    //function bindInputEvents() {
    //    bindInputEvent('keydown');
    //    bindInputEvent('keyup');
    //    bindInputEvent('keypress');
    //
    //    function bindInputEvent(event) {
    //        window.addEventListener(event, function (e) {
    //            if (e.keyCode === ROT.VK_F5)
    //                return;
    //            e.preventDefault();
    //            screenManager.handleInput(event, e);
    //
    //        });
    //    }
    //}
})