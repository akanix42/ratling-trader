"use strict";

define(function (require) {
  return Constructor;

  function Constructor(character, foregroundColor, backgroundColor, logger) {
    var self = this;

    self.draw = draw;
    foregroundColor = foregroundColor || "white";
    backgroundColor = backgroundColor || "black";

    function draw(display, x, y) {
      display.draw(x, y, character, foregroundColor, backgroundColor);
    }
  }
});