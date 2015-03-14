define(function (require) {
    var when = require('when');
    var GameTestDataBuilder = require('tests/builders/game-test-data-builder');
    var iocLoader = require('ioc-loader');
    var GameInitializedEvent = require('game/events/game-initialized-event');


    'use strict';
    describe('starting a new game', function () {
        it('should create the player character and place him on the first level', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var deferred = when.defer();
                var gameToUiBridge = new MockGameToUiBridge();
                var gameEventHub = roots.gameRoot.injector.resolve('gameEventHub');
                gameEventHub.subscribe(null, {
                    class: GameInitializedEvent,
                    handler: function () {
                        deferred.resolve(game);
                    }
                });

                var game = new GameTestDataBuilder(roots.gameRoot.injector).create();
                return deferred.promise;
                //when(deferred.promise)
                //    .then(done);

            })
                .then(function (game) {
                    game.player.should.be.ok();
                    game.level.should.be.ok();
                    game.player.tile.level.should.equal(game.level);
                    done();
                });

        });
    });


    function MockGameToUiBridge(onReadyForPlayerInput) {
        this._private = {
            onReadyForPlayerInput: onReadyForPlayerInput

        };
    }

    MockGameToUiBridge.prototype = {
        readyForPlayerInput: function () {
            this._private.onReadyForPlayerInput();
        }
    };

});
