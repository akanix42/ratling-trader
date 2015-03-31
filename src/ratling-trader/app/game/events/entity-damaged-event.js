define(function (require) {
    return EntityDamagedEvent;

    function EntityDamagedEvent(attacker, target, attack, damageReceived) {
        this.attacker = attacker;
        this.target = target;
        this.attack = attack;
        this.damage = damageReceived;
    }
});