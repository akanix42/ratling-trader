define(function (require) {
    var Creature = require('game/entities/creature'),
        inherit = require('helpers/inherit');

    return Constructor;

    function Constructor(data, Abilities) {
        var self = this;
        inherit(Creature, self, data);

        self.act = act;

        function act() {
            var ability = pickAbility();
            Abilities.get(ability.name).execute(self, ability);
            data.level.getEngine().updateUI(self);
        }

        function pickAbility() {
            return data.type.abilities[0];
        }
    }
});