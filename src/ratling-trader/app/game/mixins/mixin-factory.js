"use strict";

define(function () {
    return mixinFactory;

    function mixinFactory() {
        return {get: get};

        function get() {
            var events = [],
                commands = []

            return {
                commands: commands,
                events: events,

                addEvent: addEvent,
                addCommand: addCommand
            };


            function addEvent(event, callback) {
                events.push({event: event, callback: callback});
            }

            function addCommand(command, callback) {
                commands.push({command: command, callback: callback});
            }
        }
    }
});