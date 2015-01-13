"use strict";

define(function (require) {
  var extend = require("lib/extend/extend"),
      Entity = require("game/entities/entity");
  var nullEntity = null;


  return EntityFactory;

  function EntityFactory(logger, entityTemplatesLoader, loadedBehaviors, loadedMixins, entityAttributesFactory, entityPositionFactory, eventHubFactory, intentHubFactory) {
    var self = this;
    self.get = get;
    self.getNull = getNull;

    function get(data) {
      if (typeof data === "string") data = { type: data };

      data = extend(true, getDefaultData(), entityTemplatesLoader.get(data.type), data);
      var entity = new Entity(data, entityAttributesFactory.get(), entityPositionFactory, loadedMixins, loadedBehaviors, logger, eventHubFactory.get(), intentHubFactory.get());
      return entity;
    }

    function getDefaultData() {
      return {
        attributes: {},
        mixins: {},
        initialState: "default",
        states: { "default": { behaviors: [] } }
      };
    }

    function getNull() {
      return nullEntity || (nullEntity = get("null"));
    }
  }
});