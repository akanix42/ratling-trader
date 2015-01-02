define(function (require) {
    var stringFormat = require('stringformat');
    return Player;

    function Player(logger, scheduler, game) {
        return {
            act: act,
            performAction: performAction,
            killed: killed
        };

        function act() {
            var self = this;

            //game.updateUI(self);
            scheduler.pause();
            game.acceptInput();
        };

        function performAction() {
            var self = this;
            if (self.raiseEvent.apply(self, arguments))
                scheduler.resume();
            else {
                logger.log(stringFormat('You can\'t do {that}!', {that: arguments[0]}));
                game.acceptInput();

            }
        };

        function killed() {
            game.gameOver();
        }
    }
});