define(function (require) {
    var stringFormat = require('stringformat'),
        actCommand = require('game/commands/act-command'),
        performedCommandEvent = require('game/events/performed-command-event');

    return Player;

    function Player(mixinFactory, logger, scheduler, game) {
        var mixin = mixinFactory.get();
        mixin.addCommand(actCommand, act);
        mixin.addEvent(performedCommandEvent, performedAction);
        return mixin;

        return {
            act: act,
            performAction: performedAction,
            killed: killed
        };

        function act() {
            var self = this;

            //game.updateUI(self);
            scheduler.pause();
            game.acceptInput();
        }

        function performedAction(result) {
            if (result.wasSuccessful)
                scheduler.resume();
            else {
                logger.log(stringFormat('You can\'t do {that}!', {that: result.command.constructor.name}));
                game.acceptInput();
            }
        }

        function killed() {
            game.gameOver();
        }
    }
});