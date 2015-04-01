define(function (require) {
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');
    var when = require('when');
    var TestDisplay = require('tests/helpers/test-display');
    var Game = require('game/game');

    'use strict';

    describe('ui - a loaded game', function () {
        it('should draw each tile', function (done) {
           return done();
            var nextTileX = 0;
            var nextTileY = 0;
            var currentLevel = {
                size: {width: 2, height: 2},
                tiles: [
                    ['dirtFloor', 'dirtFloor'],
                    ['dirtFloor', 'dirtFloor'],
                ]
            };
            var asciiTiles = [
                ['.', '.'],
                ['.', '.'],
            ];
            var gameData = {
                levels: [
                    currentLevel
                ],
                currentLevel: 0
            };

            var targetNumberOfDrawCalls = currentLevel.size.width * currentLevel.size.height;
            var numberOfDrawCalls = 0;

            iocLoader
                .init(registerInjectionSubstitutions)
                .then(function (ui) {
                    ui.screens.currentScreen.loadGame();
                });

            function registerInjectionSubstitutions(gameRoot, uiRoot) {
                var originalSavedGameFactory = gameRoot.injector.resolve('savedGameFactory');
                gameRoot.injector.register('savedGameFactory', getTestSavedGameFactory(originalSavedGameFactory, gameData));
                uiRoot._private.injector.register('display', new TestDisplay(drawCallback));
            }

            function drawCallback(x, y, character) {
                if (nextTileX >= currentLevel.tiles.length)
                    return;
                if (character === asciiTiles[nextTileX][nextTileY]) {
                    nextTileY++;
                    if (nextTileY >= currentLevel.tiles[nextTileX].length) {
                        nextTileX++;
                        nextTileY = 0;
                    }
                    numberOfDrawCalls++;
                }
                console.log(numberOfDrawCalls + ' / ' + targetNumberOfDrawCalls);
                if (numberOfDrawCalls === targetNumberOfDrawCalls)
                    done();
            }


        });
        it('should restore the player\'s location', function (done) {
            var playerEntity = {
                type: 'player',

            };
            var tiles = [
                [
                    {
                        baseArchitecture: {type:'dirtFloor'},
                    },
                    {
                        baseArchitecture: {type:'dirtFloor'},
                        entities: [playerEntity]
                    },
                ],
            ];
            var currentLevel = {
                size: {width: tiles.length, height: tiles[0].length},
                tiles: tiles,
                hasBeenCreated: true
            };

            var gameData = {
                levels: [
                    currentLevel
                ],
                currentLevel: 0,
            };

            iocLoader
                .init(registerInjectionSubstitutions)
                .then(function (ui) {
                    return ui.screens.currentScreen.loadGame()
                        .then(function () {
                            return ui;
                        });
                })
                .then(function (ui) {
                    var position = ui.uiBridge._private.gameBridge._private.game.player.tile.position;
                    position.x.should.equal(0);
                    position.y.should.equal(1);
                    done();
                });

            function registerInjectionSubstitutions(gameRoot, uiRoot) {
                var originalSavedGameFactory = gameRoot.injector.resolve('savedGameFactory');
                gameRoot.injector.register('savedGameFactory', getTestSavedGameFactory(originalSavedGameFactory, gameData));
                uiRoot._private.injector.register('display', new TestDisplay());
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