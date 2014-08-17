define(function (require) {
    var Player = require('game/entities/player'),
        EntityType = require('enums/entity-type');


    return Constructor;

    function Constructor() {
        var self = this;

        self.get = get;

        function get(data) {
            data.type = EntityType.player;
            data.position = data.position || {x: 0, y: 0};
            var player = new Player(data);
            return player;
        }


    }
});