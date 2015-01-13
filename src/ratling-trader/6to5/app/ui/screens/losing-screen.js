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
      // Render our prompt to the screen
      for (var i = 0; i < 22; i++) {
        display.drawText(2, i + 1, "%b{red}You lose! :(");
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