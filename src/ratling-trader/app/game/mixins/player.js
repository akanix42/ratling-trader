define(function (require) {
    var stringFormat = require('stringformat'),
        actCommand = require('game/commands/act-command');

    return Player;

    function Player(mixinFactory, logger, scheduler, game) {
        var mixin = mixinFactory.get();
        mixin.addCommand(actCommand, act);
        //mixin.addEvent(killed)
        return mixin;

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
        }

        function performAction() {
            var self = this;
            if (self.raiseEvent.apply(self, arguments))
                scheduler.resume();
            else {
                logger.log(stringFormat('You can\'t do {that}!', {that: arguments[0]}));
                game.acceptInput();

            }
        }

        function killed() {
            game.gameOver();
        }
    }
});