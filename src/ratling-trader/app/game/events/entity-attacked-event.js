define(function (require) {
    return EntityAttackedEvent;

    function EntityAttackedEvent(attacker, target, attack) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
    }
});