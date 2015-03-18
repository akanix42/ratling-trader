define(function (require) {
    return EntityDestroyedEvent;

    function EntityDestroyedEvent(attacker, target, attack) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
    }
});