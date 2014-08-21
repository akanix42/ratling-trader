define(function (require) {
    var entities = [
        {
            name: 'player',
            type: 'player',
            mixins: [
                'mobile',
                'destructible'
            ],
            attributes: {
                strength: 1,
                health: 10
            },
            states: {
                default: {
                    behaviours: [
                        {name: 'player-input', probability: 0.6}
                    ]
                }
            }
        },
        {
            name: 'fungus',
            type: 'monster',
            states: {
                default: {
                    behaviours: [
                        {name: 'attack', probability: 0.6},
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
                    behaviours: [
                        {name: 'attack'},
                        {name: 'moveTowardTarget'},
                        {name: 'moveRandomly'},
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

