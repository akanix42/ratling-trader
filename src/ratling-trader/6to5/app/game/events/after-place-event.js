"use strict";

define(function (require) {
  var forceNew = require("force-new");
  return forceNew.whenCalled(afterPlaceEvent);

  function afterPlaceEvent(entity, destination) {
    this.entity = entity;
    this.destination = destination;
  }
});