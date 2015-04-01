define(function (require) {
    var ROT = require('rot');

    'use strict';

    function Scheduler() {
        var scheduler = new ROT.Scheduler.Simple(),
            schedulingEngine = new ROT.Engine(scheduler);
        this._private = {
            scheduler: scheduler,
            schedulingEngine: schedulingEngine
        };
        init.call(this, schedulingEngine);
    }

    Scheduler.prototype = {
        addEntity: addEntity,
        removeEntity: removeEntity,

        pause: pause,
        resume: resume

    };

    return Scheduler;


    function init(schedulingEngine) {
        schedulingEngine.start();
        //this.pause();
    }

    function addEntity(entity) {
        this._private.scheduler.add(entity, true);
    }

    function removeEntity(entity) {
        this._private.scheduler.remove(entity, true);
    }

    function pause() {
        this._private.schedulingEngine.lock();
    }

    function resume() {
        this._private.schedulingEngine.unlock();
    }

});