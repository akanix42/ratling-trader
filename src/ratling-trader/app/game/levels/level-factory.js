define(function (require) {
    var Level = require('game/levels/level');

    return LevelFactory;

    function LevelFactory(mapGenerator, entityFactory, scheduler, logger) {
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
                map: mapGenerator.createMap(),
                nullTile: null,
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
                ],
                items: [
                    {type: 'apple'}
                ]
            };

            return new Level(levelData, entityFactory, scheduler, logger);
        }
    }

});