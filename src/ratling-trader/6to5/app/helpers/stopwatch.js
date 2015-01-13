"use strict";

define(function (require) {
  var stringformat = require("stringformat");

  return Stopwatch;

  function Stopwatch(logger) {
    var self = this,
        startDate = new Date(),
        endDate = new Date();

    self.execute = execute;
    self.start = start;
    self.stop = stop;
    self.reset = reset;
    self.getElapsedMilliseconds = getElapsedMilliseconds;
    self.getExecutor = getExecutor;

    function getExecutor(context, fn, loggingString) {
      return function () {
        execute(context, fn, arguments, function (stopwatch) {
          if (loggingString) logger.logInfo(stringformat(loggingString, { elapsed: stopwatch.getElapsedMilliseconds }));
        });
      };
    }

    function execute(context, fn, args, callback) {
      start();
      var result = fn.apply(context, args);
      stop();
      if (callback) callback(self, result);
      return result;
    }

    function start() {
      reset();
      startDate = new Date();
    }

    function reset() {
      startDate = null;
      endDate = null;
    }

    function stop() {
      endDate = new Date();
    }

    function getElapsedMilliseconds() {
      if (!startDate) return 0;

      var tempEndDate = endDate || new Date();
      return tempEndDate - startDate;
    }
  }
});