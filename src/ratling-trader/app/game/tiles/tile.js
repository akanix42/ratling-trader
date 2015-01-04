define(function (require) {
    var extend = require('lib/extend/extend')
    //        EntityType = require('enums/entity-type')
        ;

    return Constructor;

    function Constructor(initialArchitecture, data, entityFactory) {
        var self = this,
            architecture = initialArchitecture,
            entities = [],
            entitiesById = {},
            neighbors = [];
        ;
        var map, creature;
        //        extend(self, type);
        self.getArchitecture = getArchitecture;
        self.dig = dig;
        self.isDiggable = isDiggable;
        self.isWalkable = isWalkable;
        self.getPosition = getPosition;
        self.setPosition = setPosition;
        self.setMap = setMap;
        self.getMap = getMap;
        self.getNeighbor = getNeighbor;
        self.getNeighbors = getNeighbors;
        self.getCreature = getCreature;
        self.setCreature = setCreature;
        self.addEntity = addEntity;
        self.removeEntity = removeEntity;
        self.getEntities = getEntities;

        function setMap(value) {
            map = value;
        }

        function getMap() {
            return map;
        }

        function getArchitecture() {
            return architecture;
        }

        function getNeighbor(dX, dY) {
            var neighborX = getPosition().x + dX,
                neighborY = getPosition().y + dY;

            return getMap().getTile(neighborX, neighborY);
        }

        function getNeighbors(radius) {
            var neighborsInRadius = [];
            for (var i = 0; i < radius; i++)
                neighborsInRadius = neighborsInRadius.concat(getNeighborsAtRadiusLevel(i));

            return neighborsInRadius;
        }

        function getNeighborsAtRadiusLevel(radiusLevel) {
            if (neighbors[radiusLevel] !== undefined)
                return neighbors[radiusLevel];

            return updateNeighbors(radiusLevel);
        }

        function updateNeighbors(radiusLevel) {
            var neighborsAtRadiusLevel = [];
            var left = getPosition().x - (radiusLevel + 1);
            var right = getPosition().x + (radiusLevel + 1)
            var top = getPosition().y - (radiusLevel + 1);
            var bottom = getPosition().y + (radiusLevel + 1);
            for (var x = left; x <= right; x++)
                for (var y = top; y <= bottom; (x === left || x === right) ? y++ : y += (radiusLevel + 1) * 2)
                    if (!(x === getPosition().x && y === getPosition().y)) {
                        var tile = getMap().getTile(x, y);
                        if (tile) neighborsAtRadiusLevel.push(tile);
                    }

            return neighbors[radiusLevel] = neighborsAtRadiusLevel;

        }

        function dig(tile) {
            if (!isDiggable())
                return false;

            architecture = entityFactory.get(architecture.getData().baseEntity);
            return true;
        }

        function isDiggable() {
            var architecture = getArchitecture();
            if (architecture === 'null')
                return false;
            return architecture.getData().isDiggable && architecture.getData().baseEntity;
        }

        function isWalkable() {
            var architecture = getArchitecture();
            if (architecture === 'null')
                return false;
            return architecture.getData().isWalkable;
        }

        function getPosition() {
            return data.position;
        }

        function setPosition(value) {
            data.position = value;
        }

        function getCreature() {
            return creature;
        }

        function setCreature(value) {
            creature = value;
        }

        function addEntity(entity) {
            if (entity.id in entitiesById)
                return;
            entitiesById[entity.id] = entity;
            entities.push(entity);
        }

        function removeEntity(entity) {
            if (!(entity.id in entitiesById))
                return;
            for (var i = 0; i < entities.length; i++)
                if (entities[i] === entity) {
                    entities.splice(i, 1);
                    break;
                }

            delete entitiesById[entity.id];
        }

        function getEntities() {
            return entities.slice(0);
        }
    }
});