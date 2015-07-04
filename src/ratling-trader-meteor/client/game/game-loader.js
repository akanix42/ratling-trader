"use strict";
Game.loader = new GameLoader();
function GameLoader() {

}

GameLoader.prototype.loadNewGame = function loadNewGame() {
    var newGameFactory = Game.container.get("newGameFactory");
    var player = Game.container.get("player");
    var world = newGameFactory.get();
    init(world);

    return world;
};

GameLoader.prototype.loadSavedGame = function loadSavedGame(data) {
    var world = Game.container.decode(data);
    init(world);
};

function init(world) {
    var subscription = postal.subscribe({
        channel: "world",
        topic: "world.save",
        callback: function saveGame() {
            var serializedData = Game.container.stringify(world);
            localStorage.setItem("game", serializedData);
            console.log("game saved!:" + serializedData);
            world = null;
            subscription.unsubscribe();
        }
    });
}
