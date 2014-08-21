define(function (require) {
    var attackEnemy = require('game/behaviors/attack-enemy'),
        cloneSelf = require('game/behaviors/clone-self')

        ;
    var behaviors = {
        attackEnemy: attackEnemy,
        'clone-self': cloneSelf,
    };


    return {
        get: function (name) {
            return behaviors[name];
        }
    };
});

