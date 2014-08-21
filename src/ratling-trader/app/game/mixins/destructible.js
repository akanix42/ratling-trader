define(function (require) {

    return Destructible;

    function Destructible() {
        var self = this;

        self.takeDamage = takeDamage;

        function takeDamage(attack) {
            self.health -= attack.damage;

            if (self.health <= 0)
                self.kill();
        }

    }
});