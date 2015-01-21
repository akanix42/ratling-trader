define(function (require) {
    function GameTestDataBuilder(injector) {
        this._private = {
            injector: injector
        };
    }

    GameTestDataBuilder.prototype = {
        withBridge: function (gameToUiBridge) {
            return this._private.injector.resolve('gameFactory').create(gameToUiBridge);
        }
    };

    return GameTestDataBuilder;
});