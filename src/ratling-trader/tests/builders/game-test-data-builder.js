define(function (require) {
    function GameTestDataBuilder(injector) {
        this._private = {
            injector: injector
        };
    }

    GameTestDataBuilder.prototype = {
        create: function () {
            return this._private.injector.resolve('gameFactory').create(this._private.injector.resolve('gameToUiBridge'));
        },
        withBridge: function (gameToUiBridge) {
            return this._private.injector.resolve('gameFactory').create(gameToUiBridge);
        }
    };

    return GameTestDataBuilder;
});