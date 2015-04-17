define(function (require) {
    'use strict';
    var Tile = require('game/tiles/tile');

    function TileFactory(nullTile, injector) {
        this._ = {
            nullTile: nullTile,
            injector: injector
        };
    }

    TileFactory.prototype = {
        //get nullTile() {
        //    return this._.nullTile;
        //},

        create: function (tileData) {
            var tile = this._.injector.inject(Tile);
            tile.init(tileData);
            return tile;
        }
    };

    return TileFactory;

});