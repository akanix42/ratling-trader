define(function (require) {
    var EntityType = require('enums/entity-type'),
        AsciiTile = require('ui/tiles/ascii-tile');

    var tiles = {};
    defineTiles();

    return Constructor;

    function Constructor() {
        var self = this;
        self.get = get;
        function get(tile) {
            var entityType = tile.getArchitecture();

            if (tile.creature)
                entityType = tile.creature.getType();

            return tiles[entityType.name];
        }
    }

    function defineTiles() {
        addTile(EntityType.stoneFloor, new AsciiTile('.'));
        addTile(EntityType.stoneWall, new AsciiTile('#', 'gray'));
        addTile(EntityType.dirtWall, new AsciiTile('#', 'goldenrod'));
        addTile(EntityType.dirtFloor, new AsciiTile('.', 'goldenrod'));
        addTile(EntityType.player, new AsciiTile('@', 'white'));

    }

    function addTile(entityType, uiTile) {
        tiles[entityType.name] = uiTile;

    }
});