define(function (require) {
    var destructible = require('game/mixins/destructible'),
        mobile = require('game/mixins/mobile'),
        monster = require('game/mixins/monster'),
        attacker = require('game/mixins/attacker'),
        player = require('game/mixins/player')
        ;
    var mixins = {
        destructible: destructible,
        attacker: attacker,
        mobile: mobile,
        monster: monster,
        player: player
    };

    return mixins;
});

