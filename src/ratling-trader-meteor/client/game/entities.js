"use strict";

Entities.typeName = "entities";
App.containers.game.register(Entities.typeName, Entities, Ioc.lifecycles.singleton);
JSONC.register(Entities);

function Entities() {

}