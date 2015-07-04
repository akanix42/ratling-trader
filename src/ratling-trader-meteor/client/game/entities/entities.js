"use strict";

Entities.typeName = "entities";
Game.registerSingleton(Entities.typeName, Entities);

function Entities() {
    this._ = {
        entities: {}
    };
}

Entities.prototype.add = function add(entity) {
    this._.entities[entity.id] = entity;
};

Entities.prototype.remove = function remove(entity) {
    this._.entities[entity.id] = null;
};
