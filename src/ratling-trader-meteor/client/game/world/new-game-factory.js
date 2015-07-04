NewGameFactory.$inject = ['world', 'zoneFactory'];
Game.registerSingleton("newGameFactory", NewGameFactory);

function NewGameFactory(world, zoneFactory) {
    this.world = world;
    this.zoneFactory = zoneFactory;
}

NewGameFactory.prototype.get = function (player) {
    var firstZone = this.zoneFactory.get();
    this.world.addZone(firstZone);
    //player.setTile(firstZone.levels[0].tiles[5][5]);

    return this.world;
};
