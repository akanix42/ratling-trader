define(function (require) {

    return Constructor;

    function Constructor(data) {
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
