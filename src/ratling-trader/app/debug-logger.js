define(function (require) {
    var LogLevel = require('enums/log-level');

    return DebugLogger;

    function DebugLogger() {
        var self = this;
        self.logLevel = LogLevel.Info;
        self.isEnabled = false;

        self.log = new LogWriter(console.log, LogLevel.Log, self).log;
        self.logWarning = new LogWriter(console.warn, LogLevel.Warn, self).log;
        self.logError = new LogWriter(console.error, LogLevel.Error, self).log;
        self.logInfo = new LogWriter(console.info, LogLevel.Info, self).log;

        function LogWriter(outputFunction, level, logger) {
            var self = this;
            self.log = log;
            function log() {
                if (level <= logger.logLevel)
                    outputFunction.apply(console, arguments);
            }
        }
    }
});