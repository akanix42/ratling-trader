define(function (require) {
    var when = require('when');
    var GameTestDataBuilder = require('tests/builders/game-test-data-builder');


    'use strict';
    describe('starting a new game', function () {
        it('should create the player character and place him on the first level', function (done) {
            var deferred = when.defer();
            var gameToUiBridge = new MockGameToUiBridge(function receiveReadyForPlayerInputNotification() {
                deferred.resolve();
            });

            var game = new GameTestDataBuilder().withBridge(gameToUiBridge);
            game.player.should.be.ok();
            game.level.should.be.ok();
            game.player.tile.level.should.equal(game.level);
            when(deferred.promise)
                .then(done);
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
