"use strict";

define(function (require) {
  var when = require("when"),
      ROT = require("rot");
  return Launcher;

  function Launcher(ui) {
    var self = this;

    self.run = run;

    function run() {
      if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
        return;
      }
      if (hasDomContentLoaded) {
        console.log("load game");
        ui.init();
      } else {
        console.log("wait load game");
        onDomContentLoaded = function () {
          ui.init();
        };
      }
    }
  }
});