define(function (require) {
    var entities = [
        {
            name: 'player',
            type: 'player',
            mixins: [
                'mobile',
                'destructible',
                'player'
            ],
            attributes: {
                strength: 1,
                health: 10
            }
        },
        {
            name: 'fungus',
            type: 'monster',
            states: {
                default: {
                    behaviors: [
                        {name: 'attack-enemy', probability: 0.6},
                        {name: 'clone-self'},
                    ]
                }
            },
            mixins: [
                'destructible'
            ],
            attributes: {
                strength: 1,
                health: 10
            }
        },
        {
            name: 'zombie',
            type: 'monster',
            states: {
                default: {
                    behaviors: [
                        {name: 'attack-enemy'},
                        {name: 'move-toward-target'},
                        {name: 'move-randomly'},
                    ]
                }
            },
            mixins: [
                'mobile',
                'destructible',
            ],
            attributes: {
                strength: 1,
                health: 10
            }
        }
    ];

    return entities;
});
