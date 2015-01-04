define(function () {
    return meleeAttackEvent;

    function meleeAttackEvent(attacker, target) {
        return {
            attacker: attacker,
            target: target
        };
    }
});