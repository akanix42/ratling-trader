define(function (require) {
    return EntityMovedEvent;

    function EntityMovedEvent(attacker, target, attack) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
    }
});