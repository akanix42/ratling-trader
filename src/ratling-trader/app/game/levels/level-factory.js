define(function (require) {
    var Level = require('game/levels/level'),
        ROT = require('rot'),
        EntityType = require('enums/entity-type');

    return Constructor;

    function Constructor(mapFactory, monsterFactory) {
        var self = this;

        self.get = get;

        function get(engine, levelType) {
            var level;
            if (levelType == 'world')
                level = generateWorld(engine);
            return level;
        }

        function generateWorld(engine) {
            var levelData = {
                engine: engine,
                map: mapFactory.get(),
                creatures: [
                    {type: EntityType.fungus, position: {x: 0, y: 0}}
                ]
            };


            return new Level(levelData, monsterFactory);
        }
    }

});