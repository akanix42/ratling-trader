"use strict";

define(function (require) {
  var architectures = require("json!config/architectures.json"),
      items = require("json!config/items.json"),
      monsters = require("json!config/monsters.json"),
      extend = require("lib/extend/extend");

  return EntityTemplatesLoader;

  function EntityTemplatesLoader(logger) {
    var templates = {};

    logger.group(EntityTemplatesLoader.name);
    logger.logInfo("loading entities");

    loadArchitectures();
    loadCreatures();
    loadItems();

    logger.logInfo("loaded entities");
    logger.groupEnd();

    return {
      getAll: getAll,
      get: get
    };

    function loadArchitectures() {
      for (var i = 0; i < architectures.length; i++) {
        addArchitecture(architectures[i]);
      }
    }

    function addArchitecture(template) {
      var defaultData = {
        type: "architecture",
        isWalkable: false
      };

      addEntityTemplate(extend({}, defaultData, template));
    }

    function addEntityTemplate(template) {
      var defaultData = {
        health: {
          base: 10
        }
      };

      templates[template.name] = extend({}, defaultData, template);
    }

    function loadCreatures() {
      for (var i = 0; i < monsters.length; i++) addEntityTemplate(monsters[i]);
    }

    function loadItems() {
      var defaultData = {
        type: "item"
      };
      for (var i = 0; i < items.length; i++) addEntityTemplate(extend({}, defaultData, items[i]));
    }

    function getAll() {
      return templates;
    }

    function get(name) {
      return templates[name];
    }
  }
});