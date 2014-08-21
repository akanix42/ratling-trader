define(function (require) {

    return AttackEnemy;

    function AttackEnemy() {
        var self = this;

        self.attack = attack;

        function attack(entity) {
            self.getLogger().log('attack!');
        }

    }
});