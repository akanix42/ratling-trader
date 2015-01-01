define(function (require) {
    var stringFormat = require('stringformat');
    return Constructor;

    function Constructor(data, entityFactory) {
        var self = this;
        var scheduler = new ROT.Scheduler.Simple(),
            schedulingEngine = new ROT.Engine(scheduler),
            entities = {};

        self.pause = pause;
        self.resume = resume;
        self.getEngine = getGame;
        self.getMap = getMap;
        self.addEntity = addEntity;
        self.removeEntity = removeEntity;

        schedulingEngine.start();
        pause();

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
            //addEntity(creature);
            return creature;
        }

        function pause() {
            schedulingEngine.lock();
        }

        function resume() {
            schedulingEngine.unlock();
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
            console.log(stringFormat('adding {getId}', entity));
            scheduler.add(entity, true);
            entities[entity.getId()] = entity;

        }

        function removeEntity(entity) {
            scheduler.remove(entity, true);
            entities[entity.getId()] = null;

        }
    }
});
