describe("ioc-registrations", function () {
    it("should successfully instantiate all registered types", function () {
        var keys = Object.keys(Game.container.registry);
        for (var i = 0; i < keys.length; i++) {
            console.log("get: " + keys[i]);
            Game.container.get(keys[i]);
        }
    });
});