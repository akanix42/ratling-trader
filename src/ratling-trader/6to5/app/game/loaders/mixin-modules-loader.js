"use strict";

define(function (require) {
  var loadModules = require("helpers/module-loader"),
      mixins = require("json!config/mixins.json");

  return loadModules(mixins);
});