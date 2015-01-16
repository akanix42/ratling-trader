define(function(require) {
    //var NullTile = require('game/tiles/null-tile');
    var Tile = require('game/tiles/new-tile');

    function TileTestDataBuilder() {

    }
    TileTestDataBuilder.prototype.createNullTile = function createNullTile() {
        return new NullTile();
    };

    TileTestDataBuilder.prototype.withPosition = function withPosition(position) {
        return new Tile(position);
    };

    return TileTestDataBuilder;

});