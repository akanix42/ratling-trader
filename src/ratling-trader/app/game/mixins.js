define(function (require) {
    var destructible = require('game/mixins/destructible'),
        mobile = require('game/mixins/mobile'),
        attacker = require('game/mixins/attacker'),
        player = require('game/mixins/player')
        ;
    var mixins = {
        destructible: destructible,
        attacker: attacker,
        mobile: mobile,
        player: player
    };

    return mixins;
});

