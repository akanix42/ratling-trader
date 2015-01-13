"use strict";

define(function (require) {
  var forceNew = require("force-new");
  return forceNew.whenCalled(performedCommandEvent);

  function performedCommandEvent(command, wasSuccessful) {
    this.command = command;
    this.wasSuccessful = wasSuccessful;
  }
});