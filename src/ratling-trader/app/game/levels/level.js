define(function (require) {

    return Constructor;

    function Constructor(data, monsterFactory) {
        var self = this;
        var scheduler = new ROT.Scheduler.Simple(),
            schedulingEngine = new ROT.Engine(scheduler);

        self.pause = pause;
        self.resume = resume;
        self.getEngine = getEngine;
        self.getMap = getMap;
        self.addEntity = addEntity;

        schedulingEngine.start();
        pause();

        processCreatures();

        function processCreatures() {
            for (var i = 0; i < data.creatures.length; i++) {
                data.creatures[i] = processCreature(data.creatures[i])

            }
        }

        function processCreature(creature) {
            creature = monsterFactory.get(creature);
            creature.setLevel(self);
            creature.setPosition(6, 5);
            addEntity(creature);
            return creature;
        }

        function pause() {
            schedulingEngine.lock();
        }

        function resume() {
            schedulingEngine.unlock();
        }

        function getEngine() {
            return data.engine;
        }

        function getMap() {
            return data.map;
        }

        function addEntity(entity) {
            scheduler.add(entity, true);
        }
    }
});
