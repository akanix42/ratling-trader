"use strict";
LevelFactory.typeName = "levelFactory";
LevelFactory.$inject = ["idGenerator"];
App.containers.game.register(LevelFactory.typeName, LevelFactory, Ioc.lifecycles.singleton);
JSONC.register(LevelFactory);


function LevelFactory(idGenerator) {
    this.idGenerator = idGenerator;
}
