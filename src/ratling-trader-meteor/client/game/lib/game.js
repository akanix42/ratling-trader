Game = {
    dataLoaders: {}
};
(function () {
    "use strict";
    var gameContainer = Game.container = App.containers.game = Ioc.create();

    Game.getType = function (typeName) {
        return JSONC.registry[typeName];
    };

    Game.registerUnique = function (typeName, type) {
        type.typeName = typeName;
        Game.container.register(typeName, type, Ioc.lifecycles.unique);
        JSONC.register(type);
    };

    Game.registerSingleton = function (typeName, type) {
        type.typeName = typeName;
        Game.container.register(typeName, type, Ioc.lifecycles.singleton);
        JSONC.register(type);
    };
})();