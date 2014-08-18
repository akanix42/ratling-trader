define(function (require) {
    var Player = require('game/entities/player'),
        Monster = require('game/entities/monster'),
        EntityType = require('enums/entity-type');


    return Constructor;

    function Constructor(Abilities) {
        var self = this;

        self.get = get;

        function get(data) {
            data.position = data.position || {x: 0, y: 0};
            var monster = new Monster(data, Abilities);
            return monster;
        }


    }
});