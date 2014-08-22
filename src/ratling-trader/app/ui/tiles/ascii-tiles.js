define(function (require) {
    var AsciiTile = require('ui/tiles/ascii-tile');

    return AsciiTiles;

    function AsciiTiles(entityTemplatesLoader) {
        var self = this;
        self.get = get;
        function get(tile) {
            var entityTemplate = tile.getArchitecture().getType();

            if (tile.getCreature())
                entityTemplate = tile.getCreature().getType();

            return tiles[entityTemplate] || tiles['unknown'];
        }

        var tiles = {};
        defineTiles();

        function defineTiles() {
            addTile(entityTemplatesLoader.get('stoneFloor'), new AsciiTile('.'));
            addTile(entityTemplatesLoader.get('stoneWall'), new AsciiTile('#', 'gray'));
            addTile(entityTemplatesLoader.get('dirtWall'), new AsciiTile('#', 'goldenrod'));
            addTile(entityTemplatesLoader.get('dirtFloor'), new AsciiTile('.', 'goldenrod'));
            addTile(entityTemplatesLoader.get('player'), new AsciiTile('@', 'white'));
            addTile(entityTemplatesLoader.get('fungus'), new AsciiTile('F', '#66FF00'));
            addTile({name: 'unknown'}, new AsciiTile('?', 'purple'));


        }

        function addTile(entityTemplate, uiTile) {
            tiles[entityTemplate.name] = uiTile;

        }
    }

});