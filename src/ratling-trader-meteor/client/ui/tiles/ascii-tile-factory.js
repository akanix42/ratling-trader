//var asciiTiles = require('json!config/ascii.json');
var asciiTiles;
$.get("/config/ascii.json", function (data) {
    asciiTiles = JSON.parse(stripJsonComments(data));
}, "text");

function AsciiTile(character, foregroundColor, backgroundColor) {
    this._ = {
        foregroundColor: foregroundColor || 'white',
        backgroundColor: backgroundColor || 'black',
        character: character || '?'
    };
}

AsciiTile.prototype.draw = function draw(display, x, y, overlay) {
    var tile = this._.tile;
    display.draw(x, y, this._.character, this._.foregroundColor, this._.backgroundColor, overlay);
};


AsciiTileFactory.typeName = "asciiTileFactory";
Ui.registerSingleton(AsciiTileFactory.typeName, AsciiTileFactory);

function AsciiTileFactory() {
    var tiles = {};
    this._ = {
        tiles: tiles
    };

    loadTiles();

    function loadTiles() {
        for (var i = 0; i < asciiTiles.length; i++)
            addAsciiTile(asciiTiles[i]);
    }

    function addAsciiTile(template) {
        tiles[template.name] = new AsciiTile(template.character, template.color, null);
    }
}

AsciiTileFactory.prototype = {
    get nullTile() {
        return this._.tiles['null'];
    },
    create: function create(tile) {
        return this._.tiles[tile] || this.nullTile;
    }
};
