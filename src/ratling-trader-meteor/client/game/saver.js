"use strict";
Saver.$inject = ["world"];
App.containers.game.register("saver", Saver, Ioc.lifecycles.singleton);

function Saver(world) {
    var self = this;
    self.game = world;

    postal.subscribe({
        channel: "world",
        topic: "world.save",
        callback: function (data, envelope) {
            self.saveGame();
        }
    });
}

Saver.prototype.saveGame = function saveGame() {
    var game = this.game;
    var gameDataDto = {
        seed: game._private.seed,
        ids: game._private.idGenerator.toDto(),
        level: game.level.toDto(),
        entities: game._private.gameEntities.toDto()
    };
    var serializedData = JSON.stringify(gameDataDto, null, 2);
    localStorage.setItem("game", serializedData);
    console.log("game saved!:" + serializedData);
};