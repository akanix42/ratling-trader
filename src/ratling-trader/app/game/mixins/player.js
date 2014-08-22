define(function (require) {
    var stringFormat = require('stringformat');
    return Player;

    function Player(logger) {
        return {
            act: act,
            performAction: performAction,
            killed: killed
        };

        function act() {
            var self = this;

            self.getLevel().getEngine().updateUI(self);
            self.getLevel().pause();
            self.getLevel().getEngine().acceptInput();
        };

        function performAction() {
            var self = this;
            if (self.raiseEvent.apply(self, arguments).metSuccess)
                self.getLevel().resume();
            else {
                logger.log(stringFormat('You can\'t do {that}!', {that: arguments[0]}));
                self.getLevel().getEngine().acceptInput();

            }
        };

        function killed() {
            var self = this;
            self.getLevel().getEngine().gameOver();
        }
    }
});