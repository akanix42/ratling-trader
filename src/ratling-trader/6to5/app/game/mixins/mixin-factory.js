"use strict";

define(function () {
  return mixinFactory;

  function mixinFactory() {
    return { get: get };

    function get() {
      var events = [],
          intents = [],
          commands = [],
          initFn = null;


      return {
        commands: commands,
        events: events,
        intents: intents,

        addIntent: addIntent,
        addEvent: addEvent,
        addCommand: addCommand,
        setInit: setInit,
        init: init

      };

      function setInit(fn) {
        initFn = fn;
      }

      function init(entity) {
        if (initFn) initFn(entity);
      }

      function addEvent(event, callback) {
        events.push({ fn: event, callback: callback });
      }

      function addIntent(intent, callback) {
        intents.push({ fn: intent, callback: callback });
      }

      function addCommand(command, callback) {
        commands.push({ fn: command, callback: callback });
      }
    }
  }
});