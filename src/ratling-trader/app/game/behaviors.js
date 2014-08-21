define(function (require) {
    var attackEnemy = require('game/behaviors/attackEnemy')

        ;
    var behaviors = {
        attackEnemy: attackEnemy,
    };


    return {
        get: function (name) {
            return behaviors[name];
        }
    };
});

