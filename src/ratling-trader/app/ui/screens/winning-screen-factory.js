define(function (require) {
    var WinningScreen = require('ui/screens/winning-screen');
    return Constructor;

    function Constructor(logger) {
        var self = this;
        self.get = function get(display, ui) {
            return new WinningScreen(ui, display, logger);
        };
    }
});