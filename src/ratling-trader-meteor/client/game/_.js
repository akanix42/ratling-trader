"use strict";
App.containers.game = Ioc.create();

Meteor.startup(function () {
    var world = App.containers.game.get("world");
    var saver = App.containers.game.get("saver");
});
