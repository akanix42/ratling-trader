define(function (require) {
    var stringformat = require('stringformat');
    return Destructible;

    function Destructible() {
        var self = this;

        self.takeDamage = takeDamage;

        function takeDamage(attack) {
            self.getLogger().log(stringformat('ouch: {damage} ', attack));

            self.getData().attributes.health -= attack.damage;
            self.getLogger().log(stringformat('health remaining: {health}', self.getData().attributes));

            if (self.getData().attributes.health <= 0)
                self.kill();
        }

    }
});