"use strict";

define(function (require) {
  var ROT = require("rot");

  return Constructor;

  function Constructor(ui, display, logger) {
    var self = this;

    self.enter = enter;
    self.exit = exit;
    self.render = render;
    self.handleInput = handleInput;

    function render() {}

    function handleInput(inputType, inputData) {}

    function enter() {}

    function exit() {}
  }

});