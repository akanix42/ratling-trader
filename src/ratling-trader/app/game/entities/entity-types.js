define(function (require) {
    var monsters = require('config/monsters'),
        architecture = require('config/architecture');

    return EntityTypes;
    function EntityTypes(logger) {

        var entityTypes = {};
        logger.group(EntityTypes.name);
        logger.logInfo('loading entities');
        defineArchitecture();
        defineCreatures();
        logger.logInfo('loaded entities');

        logger.groupEnd();
        return {
            get: function (name) {
                return entityTypes[name];
            }
        };

        function defineArchitecture() {
            //        addArchitecture({name: 'null'});
            //        addArchitecture({name: 'stoneWall', baseEntity: 'stoneFloor', isWalkable: false});
            //        addArchitecture({name: 'stoneFloor', isWalkable: true});
            //        addArchitecture({name: 'dirtWall', baseEntity: 'dirtFloor', isWalkable: false, isDiggable: true});
            //        addArchitecture({name: 'dirtFloor', isWalkable: true});
            for (var i = 0; i < architecture.length; i++) {
                addArchitecture(architecture[i]);
            }
        }

        function defineCreatures() {
            for (var i = 0; i < monsters.length; i++) {
                addEntity(monsters[i]);
            }
            //        addEntity({name: 'player', type: 'player',
            //            traits: [
            //                'mobile',
            //                'destructible'
            //            ],
            //            attributes: {
            //                strength: 1,
            //                health: 10
            //            }});
            //
            //        addEntity({
            //            name: 'fungus',
            //            type: 'monster',
            //            states: {
            //                idle: {
            //                    behaviours: [
            //                        {name: 'attack', probability: 0.6},
            //                        {name: 'clone-self'},
            //                    ]
            //                }
            //            },
            //            traits: [
            //                'immobile',
            //                'destructible'
            //            ],
            //            attributes: {
            //                strength: 1,
            //                health: 10
            //            }
            //            //
            //            //            abilities: [
            //            //                {name: 'clone',
            //            //                    cooldown: 1,
            //            //                    limits: [
            //            //                        {material: 'stone'}
            //            //                    ]
            //            //                }
            //            //            ]
            //        });
        }

        function addArchitecture(entityType) {
            entityType.type = 'architecture';
            addEntity(entityType);
        }

        function addEntity(entityType) {
            entityTypes[entityType.name] = entityType;
        }
    }
});