define(function (require) {
    var Creature = require('game/entities/creature'),
        inherit = require('helpers/inherit');

    return Constructor;

    function Constructor(data) {
        var self = this;
        inherit(Creature, self, data);
        //Creature.apply(self, data);
        //        var base = extend({}, self);
        //
        self.move = move;
        function move(dX, dY) {
            self.base.move(dX, dY);
            data.level.resume();
        }

        self.act = act;

        function act() {
            data.level.getEngine().updateUI(self);
            data.level.pause();
        }
    }
});