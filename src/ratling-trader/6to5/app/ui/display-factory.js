"use strict";

define(function (require) {
  return DisplayFactory;

  function DisplayFactory() {
    var self = this;
    self.get = get;

    function get() {
      var height = 24,
          width = Math.floor(document.getElementById("ui").offsetWidth / 11);

      if (width % 2 !== 0) width = 2 * Math.round((width - 1) / 2);

      var display = new ROT.Display({ width: width, height: height, fontSize: 20 });
      ROT.Display.Rect.cache = true;
      var container = display.getContainer();

      document.getElementById("ui-screen").appendChild(container);

      return display;
    }
  }
});