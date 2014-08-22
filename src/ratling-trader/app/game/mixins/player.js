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

            var positionManager = self.getPositionManager();
            positionManager.getLevel().getEngine().updateUI(self);
            positionManager.getLevel().pause();
            positionManager.getLevel().getEngine().acceptInput();
        };

        function performAction() {
            var self = this;
            if (self.raiseEvent.apply(self, arguments).metSuccess)
                self.getPositionManager().getLevel().resume();
            else {
                logger.log(stringFormat('You can\'t do {that}!', {that: arguments[0]}));
                self.getPositionManager().getLevel().getEngine().acceptInput();

            }
        };

        function killed() {
            var self = this;
            self.getPositionManager().getLevel().getEngine().gameOver();
        }
    }
});