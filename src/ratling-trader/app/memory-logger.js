define(function (require) {
    var LogLevel = require('enums/log-level');

    function MemoryLogger() {
        var self = this;
        self.logs = [];
        self.errors = [];
        self.infos = [];
        self.warnings = [];
        self.all = [];
        self.logLevel = LogLevel.None;
    }

    MemoryLogger.prototype.log = function log(data) {
        this.logs.push(data);
        this.all.push(data);
        if (this.logLevel >= LogLevel.log)
            console.log(data);
    };

    MemoryLogger.prototype.error = function error(data) {
        this.errors.push(data);
        this.all.push(data);
        if (this.logLevel >= LogLevel.error)
            console.error(data);
    };

    MemoryLogger.prototype.warn = function warn(data) {
        this.warnings.push(data);
        this.all.push(data);
        if (this.logLevel >= LogLevel.warn)
            console.warn(data);
    };

    MemoryLogger.prototype.info = function info(data) {
        this.infos.push(data);
        this.all.push(data);
        if (this.logLevel >= LogLevel.info)
            console.info(data);
    };

    MemoryLogger.prototype.group = function group() {
    };
    MemoryLogger.prototype.groupEnd = function groupEnd() {
    };
    return MemoryLogger;

});