define(function (require) {
    var Tile = require('game/tiles/tile');

    return Constructor;

    function Constructor() {
        var self = this;
        self.get = get;

        function get(tileType) {
            return new Tile(tileType);

        }
    }
});