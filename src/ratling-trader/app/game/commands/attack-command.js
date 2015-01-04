define(function (require) {
    var forceNew = require('force-new');

    return forceNew.whenCalled(attackCommand);

    function attackCommand(attacker, target) {
        this.attacker = attacker,
            this.target = target;
    }
});
