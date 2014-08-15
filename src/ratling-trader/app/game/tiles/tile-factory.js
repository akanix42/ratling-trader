define(function (require) {
    var Tile = require('game/tile/tile');

    return Constructor;

    function Constructor(tileType) {
        var self = this;

        return new Tile(tileType);
    }
});