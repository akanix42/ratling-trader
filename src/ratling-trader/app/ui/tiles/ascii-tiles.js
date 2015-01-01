define(function (require) {

    return AsciiTiles;

    function AsciiTiles(asciiLoader) {
        var self = this;
        var tiles = asciiLoader.getAll();

        self.get = get;

        function get(tile) {
            var entityTemplate = tile.getArchitecture().getType();

            if (tile.getCreature())
                entityTemplate = tile.getCreature().getType();

            return tiles[entityTemplate] || tiles['unknown'];
        }
    }
});