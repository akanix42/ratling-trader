define(function (require) {
    var //EntityType = require('enums/entity-type'),
        AsciiTile = require('ui/tiles/ascii-tile');

    return AsciiTiles;

    function AsciiTiles(entityTypes) {
        var self = this;
        self.get = get;
        function get(tile) {
            var entityType = tile.getArchitecture().getType();

            if (tile.getCreature())
                entityType = tile.getCreature().getType();

            return tiles[entityType] || tiles['unknown'];
        }

        var tiles = {};
        defineTiles();

        function defineTiles() {
            addTile(entityTypes.get('stoneFloor'), new AsciiTile('.'));
            addTile(entityTypes.get('stoneWall'), new AsciiTile('#', 'gray'));
            addTile(entityTypes.get('dirtWall'), new AsciiTile('#', 'goldenrod'));
            addTile(entityTypes.get('dirtFloor'), new AsciiTile('.', 'goldenrod'));
            addTile(entityTypes.get('player'), new AsciiTile('@', 'white'));
            addTile(entityTypes.get('fungus'), new AsciiTile('F', '#66FF00'));
            addTile({name: 'unknown'}, new AsciiTile('?', 'purple'));


        }

        function addTile(entityType, uiTile) {
            tiles[entityType.name] = uiTile;

        }
    }

});