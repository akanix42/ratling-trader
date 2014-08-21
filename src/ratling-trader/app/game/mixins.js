define(function (require) {
    var destructible = require('game/mixins/destructible'),
        mobile = require('game/mixins/mobile'),
        monster = require('game/mixins/monster'),
        player = require('game/mixins/player')
        ;
    var mixins = {
        destructible: destructible,
        mobile: mobile,
        monster: monster,
        player: player
    };

    return mixins;
});

