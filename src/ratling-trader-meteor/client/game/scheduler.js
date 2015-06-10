"use strict";
Scheduler.typeName = "scheduler";
App.containers.game.register("scheduler", Scheduler, Ioc.lifecycles.singleton);
JSONC.register(Scheduler);

function Scheduler(){

}