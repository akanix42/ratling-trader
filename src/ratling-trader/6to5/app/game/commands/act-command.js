"use strict";

define(function (require) {
  var forceNew = require("force-new");

  return forceNew.whenCalled(actCommand);

  function actCommand() {}
});