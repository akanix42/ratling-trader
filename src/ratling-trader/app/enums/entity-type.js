define(function (require) {
    var entityTypes = {};

    defineArchitecture();
    defineCreatures();

    return entityTypes;

    function defineArchitecture() {
        addArchitecture({name: 'null'});
        addArchitecture({name: 'stoneWall', baseEntity: 'stoneFloor', isWalkable: false});
        addArchitecture({name: 'stoneFloor', isWalkable: true});
        addArchitecture({name: 'dirtWall', baseEntity: 'dirtFloor', isWalkable: false, isDiggable: true});
        addArchitecture({name: 'dirtFloor', isWalkable: true});
    }

    function defineCreatures() {
        addEntity({name: 'player', type: 'player'});
        addEntity({
            name: 'fungus',
            type: 'monster',
            abilities: [
                {name: 'clone',
                    cooldown: 1,
                    limits: [
                        {material: 'stone'}
                    ]
                }
            ]
        });
    }

    function addArchitecture(entityType) {
        entityType.type = 'architecture';
        addEntity(entityType);
    }

    function addEntity(entityType) {
        entityTypes[entityType.name] = entityType;
    }
});