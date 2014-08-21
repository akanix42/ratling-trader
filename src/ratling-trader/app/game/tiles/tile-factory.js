define(function (require) {
    var Tile = require('game/tiles/tile');

    return Constructor;

    function Constructor(entityFactory) {
        var self = this;
        self.get = get;

        function get(initialArchitecture, data) {
            return new Tile(initialArchitecture, data, entityFactory);

        }
    }
});