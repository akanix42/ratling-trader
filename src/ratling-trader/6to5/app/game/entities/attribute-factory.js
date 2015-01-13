"use strict";

define(function (require) {
  var extend = require("lib/extend/extend"),
      attribute = require("game/entities/attribute");

  return attributeFactory;

  function attributeFactory() {
    var defaultData = {
      base: 0,
      maxBase: null,
      bonus: 0,
      current: null,
      modifiers: {}
    };

    return { get: get };

    function get(data) {
      return attribute(extend({}, defaultData, data));
    }
  }
});