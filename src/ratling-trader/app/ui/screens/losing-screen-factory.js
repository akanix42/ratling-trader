define(function (require) {
    var LosingScreen = require('ui/screens/losing-screen');
    return Constructor;

    function Constructor(logger) {
        var self = this;
        self.get = function get(display, ui) {
            return new LosingScreen (ui, display, logger);
        };
    }
});