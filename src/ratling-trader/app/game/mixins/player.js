define(function (require) {

    return Player;

    function Player() {
        var self = this;

        self.act = function act() {
            self.getLevel().getEngine().updateUI(self);
            self.getLevel().pause();
        };

        self.performAction = function performAction(command) {
            if (!command in self)
                return {error: 'Invalid command'};
            var args = Array.prototype.slice.call(arguments, 1);
            self[command].apply(self, args);

            self.getLevel().resume();
        };

    }
});