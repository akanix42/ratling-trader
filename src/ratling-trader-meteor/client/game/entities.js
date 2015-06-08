"use strict";

Entities.typeName = "entities";
App.containers.game.register(Entities.typeName, Entities, Ioc.lifecycles.singleton);
Classes.register(Entities);

function Entities() {

}