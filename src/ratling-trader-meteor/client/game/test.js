Meteor.startup(function () {
    g = App.containers.game;
    s = new Ioc.Serializer(g, g.get("world"));
});
