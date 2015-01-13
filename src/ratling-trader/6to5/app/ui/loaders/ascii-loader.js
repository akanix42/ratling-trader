"use strict";

define(function (require) {
  var AsciiTile = require("ui/tiles/ascii-tile"),
      asciiTiles = require("json!config/ascii.json");

  return AsciiLoader;

  function AsciiLoader(logger) {
    var tiles = {};

    logger.group(AsciiLoader.name);
    logger.logInfo("loading ascii tiles");

    loadTiles();
    logger.logInfo("loaded ascii tiles");
    logger.groupEnd();

    return {
      getAll: getAll,
      get: get
    };

    function loadTiles() {
      for (var i = 0; i < asciiTiles.length; i++) {
        addAsciiTile(asciiTiles[i]);
      }
    }

    function addAsciiTile(template) {
      tiles[template.name] = new AsciiTile(template.character, template.color, null, logger);
    }


    function getAll() {
      return tiles;
    }

    function get(name) {
      return tiles[name];
    }
  }
});