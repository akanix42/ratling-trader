"use strict";
Game.registerSingleton("scheduler", Scheduler);

function Scheduler() {
    this.scheduler = new ROT.Scheduler.Simple();
    this.schedulingEngine = new ROT.Engine(this.scheduler);
}

Scheduler.prototype.addEntity =
    function addEntity(entity) {
        this._.scheduler.add(entity, true);
    };

Scheduler.prototype.removeEntity =
    function removeEntity(entity) {
        this._.scheduler.remove(entity, true);
    };

Scheduler.prototype.pause =
    function pause() {
        this._.schedulingEngine.lock();
    };

Scheduler.prototype.resume =
    function resume() {
        this._.schedulingEngine.unlock();
    };

