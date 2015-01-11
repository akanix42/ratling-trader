define(function () {
    return Scheduler;

    function Scheduler() {
        var scheduler = new ROT.Scheduler.Simple(),
            schedulingEngine = new ROT.Engine(scheduler);

        init();

        return {
            addEntity: addEntity,
            removeEntity: removeEntity,

            pause: pause,
            resume: resume
        };

        function init(){
            schedulingEngine.start();
            pause();
        }

        function addEntity(entity) {
            scheduler.add(entity, true);
        }

        function removeEntity(entity) {
            scheduler.remove(entity, true);
        }

        function pause() {
            schedulingEngine.lock();
        }

        function resume() {
            schedulingEngine.unlock();
        }

    }
});