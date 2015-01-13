"use strict";

define(function (require) {
  var forceNew = require("force-new");
  return forceNew.whenCalled(attackCompletedEvent);

  function attackCompletedEvent(attacker, target, attack) {
    this.attacker = attacker;
    this.target = target;
    this.attack = attack;
  }
});