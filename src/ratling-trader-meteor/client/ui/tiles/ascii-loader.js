//var AsciiTile = require('ui/tiles/ascii-tile'),
//    asciiTiles = require('json!config/ascii.json');

function AsciiLoader(logger) {
    var tiles = {};

    logger.group(AsciiLoader.name);
    logger.info('loading ascii tiles');

    loadTiles();
    logger.info('loaded ascii tiles');
    logger.groupEnd();

    return {
        getAll: getAll,
        get: get
    };

    function loadTiles() {
        for (var i = 0; i < asciiTiles.length; i++) {
            addAsciiTile(asciiTiles[i]);
        }
    }

    function addAsciiTile(template) {
        tiles[template.name] = new AsciiTile(template.character, template.color, null);
    }


    function getAll() {
        return tiles;
    }

    function get(name) {
        return tiles[name];
    }

}

