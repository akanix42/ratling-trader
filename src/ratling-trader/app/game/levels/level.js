define(function (require) {
    var stringFormat = require('stringformat');
    return Level;

    function Level(data, entityFactory, scheduler, logger) {
        var self = this;
        var entities = {};

        self.getEngine = getGame;
        self.getMap = getMap;
        self.addEntity = addEntity;
        self.removeEntity = removeEntity;

        processCreatures();

        function processCreatures() {
            for (var i = 0; i < data.creatures.length; i++) {
                data.creatures[i] = processCreature(data.creatures[i])
            }
        }

        function processCreature(creature) {
            creature = entityFactory.get(creature);
            creature.getPositionManager().setLevel(self);
            creature.getPositionManager().setTile(getMap().getRandomTile({architectures: ['stoneFloor']}));

            return creature;
        }

        function getGame() {
            return data.game;
        }

        function getMap() {
            return data.map;
        }

        function addEntity(entity) {
            if (entities[entity.getId()])
                return;
            logger.log(stringFormat('adding {getId}', entity));
            scheduler.addEntity(entity);
            entities[entity.getId()] = entity;

        }

        function removeEntity(entity) {
            scheduler.removeEntity(entity);
            entities[entity.getId()] = null;

        }
    }
});
