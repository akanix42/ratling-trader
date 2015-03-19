define(function (require) {
    var LogLevel = require('enums/log-level'),
        moment = require('moment');

    return DebugLogger;

    function DebugLogger() {
        var self = this;
        self.logLevel = LogLevel.Info;
        self.isEnabled = false;

        self.log = new LogWriter(console.log, LogLevel.Log, self).log;
        self.warn = new LogWriter(console.warn, LogLevel.Warn, self).log;
        self.error = new LogWriter(console.error, LogLevel.Error, self).log;
        self.info = new LogWriter(console.info, LogLevel.Info, self).log;

        self.group = consoleApply(console.group);
        self.groupEnd = consoleApply(console.groupEnd);


        function consoleApply(fn) {
            return function () {
                fn.apply(console, arguments);
            }
        }

        function LogWriter(outputFunction, level, logger) {
            var self = this;
            self.log = log;
            function log() {
                var args = [moment().format('hh:mm:ss')].concat(Array.prototype.slice.call(arguments, 0));
                if (level <= logger.logLevel)
                    outputFunction.apply(console, args);
            }
        }
    }
});