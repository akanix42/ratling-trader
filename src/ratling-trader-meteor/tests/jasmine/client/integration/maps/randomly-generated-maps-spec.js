"use strict";
describe("a randomly generated map", function () {
    it("should be full of tiles", function test(done) {
        var IdGenerator = Game.getType("idGenerator");
        var RandomMapGenerator = Game.getType("randomMapGenerator");
        var randomMapGenerator = new RandomMapGenerator(new IdGenerator());
        var map = randomMapGenerator.get({width: 20, height: 20});
        for (var x = 0, width = map.length; x < width; x++) {
            var row = map[x];
            for (var y = 0, height = map.length; y < height; y++) {
                expect(row[y]).toBeTruthy();
                expect(row[y].baseArchitecture).toBeTruthy();
            }
        }
        done();
    });
});
