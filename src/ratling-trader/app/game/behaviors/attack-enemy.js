define(function (require) {

    return AttackEnemy;

    function AttackEnemy() {

        return {execute: attackEnemy};

        function attackEnemy(entity) {
            entity.getLogger().log('attack!!!!');
        }
    }
});