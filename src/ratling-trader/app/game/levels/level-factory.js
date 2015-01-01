define(function (require) {
    var Level = require('game/levels/level'),
        ROT = require('rot');
//        EntityType = require('enums/entity-type');

    return Constructor;

    function Constructor(mapFactory, entityFactory, scheduler, logger) {
        var self = this;

        self.get = get;

        function get(game, levelType) {
            var level;
            if (levelType == 'world')
                level = generateWorld(game);
            return level;
        }

        function generateWorld(game) {
            var levelData = {
                game: game,
                map: mapFactory.get(),
                creatures: [
                    //{type: 'fungus'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                    {type: 'zombie'},
                ]
            };


            return new Level(levelData, entityFactory, scheduler, logger);
        }
    }

});