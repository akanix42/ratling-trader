"use strict";
LevelFactory.typeName = "levelFactory";
LevelFactory.$inject = ["idGenerator"];
Game.registerSingleton(LevelFactory.typeName, LevelFactory);

function LevelFactory(idGenerator) {
    this.idGenerator = idGenerator;
}

