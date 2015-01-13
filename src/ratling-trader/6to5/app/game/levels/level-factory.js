"use strict";

define(function (require) {
  var Level = require("game/levels/level");

  return LevelFactory;

  function LevelFactory(mapGenerator, entityFactory, scheduler, logger) {
    var self = this;

    self.get = get;

    function get(game, levelType) {
      var level;
      if (levelType == "world") level = generateWorld(game);
      return level;
    }

    function generateWorld(game) {
      var levelData = {
        game: game,
        map: mapGenerator.createMap(),
        nullTile: null,
        creatures: [],
        items: []
      };

      return new Level(levelData, entityFactory, scheduler, logger);
    }
  }
});
//{type: 'fungus'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'zombie'},
//{type: 'apple'}