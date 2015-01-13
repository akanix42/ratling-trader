"use strict";

define(function (require) {
  var ROT = require("rot");

  return MapGenerator;

  function MapGenerator(tileFactory, entityFactory) {
    var self = this;
    var mapWidth = 20,
        mapHeight = 20;
    self.createMap = createMap;
    var nullTile = tileFactory.getNull();

    function createMap() {
      return {
        tiles: generateCaveMap(),
        nullTile: nullTile
      };
    }

    function generateCaveMap() {
      var tiles = createEmptyMap();
      var generator = new ROT.Map.Cellular(mapWidth, mapHeight);
      generator.randomize(0.5);

      var totalIterations = 3;
      for (var i = 0; i < totalIterations - 1; i++) generator.create();
      generator.create(updateMapTile);

      return tiles;

      function updateMapTile(x, y, type) {
        tiles[x][y] = type === 1 ? tileFactory.get(entityFactory.get("stoneFloor"), { position: { x: x, y: y } }) : tileFactory.get(ROT.RNG.getUniform() < 0.4 ? entityFactory.get("stoneWall") : entityFactory.get("dirtWall"), {
          position: {
            x: x,
            y: y
          }
        });
      }
    }

    function createEmptyMap() {
      var tiles = [];
      for (var x = 0; x < mapWidth; x++) {
        tiles.push([]);
        for (var y = 0; y < mapHeight; y++) tiles[x].push(nullTile);
      }

      return tiles;
    }
  }
});