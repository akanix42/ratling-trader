"use strict";

define(function (require) {
  var forceNew = require("force-new");
  return forceNew.whenCalled(afterMoveEvent);

  function afterMoveEvent(entity, origin, destination) {
    this.entity = entity;
    this.destination = destination;
    this.origin = origin;
  }
});