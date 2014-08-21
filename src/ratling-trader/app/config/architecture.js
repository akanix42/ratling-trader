define(function (require) {
    var entities = [
        {name: 'null'},
        {name: 'stoneWall', baseEntity: 'stoneFloor', isWalkable: false},
        {name: 'stoneFloor', isWalkable: true},
        {name: 'dirtWall', baseEntity: 'dirtFloor', isWalkable: false, isDiggable: true},
        {name: 'dirtFloor', isWalkable: true},
    ];

    return entities;
});

