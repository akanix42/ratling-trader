"use strict";

define(function (require) {
  var i = 1;
  return {
    GoLeft: i++,
    GoUpLeft: i++,
    GoUp: i++,
    GoUpRight: i++,
    GoRight: i++,
    GoDownRight: i++,
    GoDown: i++,
    GoDownLeft: i++,
    WaitInPlace: i++ };
});