define(function (require) {

    return AsciiTiles;

    function AsciiTiles(asciiLoader) {
        var self = this;
        var tiles = asciiLoader.getAll();

        self.get = get;

        function get(tile) {
            var entityTemplate = null;

            var entities = tile.getCreatures();
            if (entities.length)
                entityTemplate = entities[entities.length - 1].getType();

            if (!entityTemplate)
                entityTemplate = tile.getArchitecture().getType();

            return tiles[entityTemplate] || tiles['unknown'];
        }
    }
});