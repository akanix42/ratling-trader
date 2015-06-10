"use strict";
IdGenerator.typeName = "idGenerator";
App.containers.game.register(IdGenerator.typeName, IdGenerator, Ioc.lifecycles.singleton);
JSONC.register(IdGenerator);

function IdGenerator() {
    this.ids = {};
}

IdGenerator.prototype.getNextId = function getNextId(type) {
    var ids = this.ids;
    return type in ids
        ? ids[type]++
        : ids[type] = 1;
};
