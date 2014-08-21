define(function (require) {

    return AttackEnemy;

    function AttackEnemy() {
        var self = this;

        self.attack = attack;

        function attack(target) {
            if (isInRange()) {
                self.getLogger().log('attack!');
                target.takeDamage({damage: 1});
                return true;
            }
            return false;

            function isInRange() {
                return getDistance(self.getPosition().x, self.getPosition().y, target.getPosition().x, target.getPosition().y) === 1;
            }

            function getDistance(x1, y1, x2, y2) {
                return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
                //                return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            }
        }


    }
});