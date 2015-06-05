"use strict";
LevelFactory.typeName = "levelFactory";

App.containers.game.register(LevelFactory.typeName, LevelFactory, Ioc.lifecycles.singleton);
EJSON.addType(LevelFactory.typeName, deserialize);

function LevelFactory() {

}
LevelFactory.prototype = {

    toJSONValue: function toJSONValue() {
        return {

        };
    },
    typeName: function typeName() {
        return LevelFactory.typeName;
    }
};

function deserialize(data) {
    debugger
    return "testing!!!";
}