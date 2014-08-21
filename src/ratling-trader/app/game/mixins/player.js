define(function (require) {

    return Player;

    function Player() {
        var self = this;

        self.act = function act() {
            self.getLevel().getEngine().updateUI(self);
            self.getLevel().pause();
        };
    }
});