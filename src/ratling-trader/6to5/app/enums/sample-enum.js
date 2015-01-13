"use strict";

define(function (require) {
  var i = 1;
  return {
    "null": i++,
    wall: i++,
    floor: i++,
    player: i++
  };
});