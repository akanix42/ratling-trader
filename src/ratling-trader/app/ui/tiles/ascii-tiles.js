define(function (require) {

    return AsciiTiles;

    function AsciiTiles(asciiLoader) {
        var self = this;
        self.get = get;
        function get(tile) {
            var entityTemplate = tile.getArchitecture().getType();

            if (tile.getCreature())
                entityTemplate = tile.getCreature().getType();

            return tiles[entityTemplate] || tiles['unknown'];
        }

        var tiles = asciiLoader.getAll();
        //defineTiles();
        //
        //function defineTiles() {
        //    addTile(entityTemplatesLoader.get('null'), new AsciiTile('8', 'gray'));
        //    addTile(entityTemplatesLoader.get('stoneFloor'), new AsciiTile('.'));
        //    addTile(entityTemplatesLoader.get('stoneWall'), new AsciiTile('#', 'gray'));
        //    addTile(entityTemplatesLoader.get('dirtWall'), new AsciiTile('#', 'goldenrod'));
        //    addTile(entityTemplatesLoader.get('dirtFloor'), new AsciiTile('.', 'goldenrod'));
        //    addTile(entityTemplatesLoader.get('player'), new AsciiTile('@', 'white'));
        //    addTile(entityTemplatesLoader.get('fungus'), new AsciiTile('F', '#66FF00'));
        //    addTile({name: 'unknown'}, new AsciiTile('?', 'purple'));
        //
        //
        //}
        //
        //function addTile(entityTemplate, uiTile) {
        //    tiles[entityTemplate.name] = uiTile;
        //
        //}
    }

});