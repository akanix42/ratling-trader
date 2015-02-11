define(function (require) {
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');
    var when = require('when');
    var TestDisplay = require('tests/helpers/test-display');
    var Game = require('game/game');
    'use strict';

    describe('ui - a loaded game', function () {
        it('should draw each tile', function (done) {
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
                var SavedGameFactory = getSavedGameFactory(gameData);
                gameRoot._private.injector.register('savedGameFactory', SavedGameFactory);
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

            function getSavedGameFactory(gameData) {

                function SavedGameFactory(levelFactory, entityFactory) {
                    this._private = {
                        gameData: gameData,
                        levelFactory: levelFactory,
                        entityFactory: entityFactory
                    };
                }

                SavedGameFactory.prototype.create = function create(gameToUiBridge) {
                    return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, gameData);
                };

                return SavedGameFactory;
            }

        });
        it('should restore the player\'s location', function (done) {
            var playerEntity = {
                type: 'player',

            };
            var tiles = [
                [
                    {
                        baseArchitecture: 'dirtFloor',
                        entities: [playerEntity]
                    }
                ],
            ];
            var currentLevel = {
                size: {width: tiles.length, height: tiles[0].length},
                tiles: tiles
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
                    position.x.should.equal(1);
                });

            function registerInjectionSubstitutions(gameRoot, uiRoot) {
                var SavedGameFactory = getSavedGameFactory(gameData);
                gameRoot._private.injector.register('savedGameFactory', SavedGameFactory);
                uiRoot._private.injector.register('display', new TestDisplay());
            }

            function getSavedGameFactory(gameData) {

                function SavedGameFactory(levelFactory, entityFactory) {
                    this._private = {
                        gameData: gameData,
                        levelFactory: levelFactory,
                        entityFactory: entityFactory
                    };
                }

                SavedGameFactory.prototype.create = function create(gameToUiBridge) {
                    return new Game(gameToUiBridge, this._private.levelFactory, this._private.entityFactory, gameData);
                };

                return SavedGameFactory;
            }

        });

    });
});