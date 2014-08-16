define(function (require) {
    var PlayingScreen = require('ui/screens/playing-screen');
    return Constructor;

    function Constructor(logger, asciiTiles) {
        var self = this;
        self.get = function get(display, ui) {
            return new PlayingScreen(ui, logger, asciiTiles);
        };
    }
});