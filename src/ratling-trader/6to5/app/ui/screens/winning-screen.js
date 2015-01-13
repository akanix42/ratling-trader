"use strict";

define(function (require) {
  var ROT = require("rot");

  return Constructor;

  function Constructor(ui, display, logger) {
    var commands = getCommands();
    var self = this;

    self.enter = enter;
    self.exit = exit;
    self.render = render;
    self.handleInput = handleInput;

    function render() {
      for (var i = 0; i < 22; i++) {
        // Generate random background colors
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var background = ROT.Color.toRGB([r, g, b]);
        display.drawText(2, i + 1, "%b{" + background + "}You win!");
      }
    }

    function handleInput(inputType, inputData) {
      if (!(inputData.keyCode in commands)) return;
      commands[inputData.keyCode]();
    }

    function enter() {}

    function exit() {}

    function getCommands() {
      var commands = {};

      return commands;
    }
  }

});