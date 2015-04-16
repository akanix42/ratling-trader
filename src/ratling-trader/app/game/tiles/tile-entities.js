define(function () {

    function TileEntities() {
        this._private = {
            entities: [],
            airSpaceEntities: [],
            floorSpaceEntities: [],
            architecture: null,
            entitySpacesMap: new Map()
        };
    }

    TileEntities.prototype = {
        get airSpace() {
            return this._private.airSpaceEntities.slice();
        },
        get architecture() {
            return this._private.architecture;
        },
        get floorSpace() {
            return this._private.floorSpaceEntities.slice();
        }
    };
    TileEntities.prototype.add = function add(entity) {
        var indexOfEntity = findEntity(entity, this._private.entities);

        if (indexOfEntity !== undefined)
            return true;

        this._private.entities.push(entity);
        if (entity.space === 'architecture') {
            if (this._private.architecture)
                this._private.architecture.tile = null;
            this._private.architecture = entity;
        }
        else if (entity.space) {
            var space = this.getSpace(entity.space);
            space.push(entity);
            this._private.entitySpacesMap.set(entity, space);
        }
        return true;
    };

    TileEntities.prototype.getSpace = function getSpace(spaceName) {
        var spaceKey = spaceName + 'SpaceEntities';

        return this._private[spaceKey] || (this._private[spaceKey] = []);
    };

    TileEntities.prototype.all = function all() {
        return this._private.entities.slice();
    };

    TileEntities.prototype.remove = function remove(entity) {
        removeArrayElementAt(findEntity(entity, this._private.entities), this._private.entities);

        var space = this._private.entitySpacesMap.get(entity);
        if (space)
            removeArrayElementAt(findEntity(entity, space), space);
    };

    TileEntities.prototype.toDto = function toDto(){
        return this._private.entities.map(function(entity){
            return entity.id;
        });
    };

    function removeArrayElementAt(index, array) {
        if (index === undefined)
            return;
        array.splice(index, 1);
    }

    function findEntity(entity, entities) {
        for (var i = 0; i < entities.length; i++) {
            var arrayEntity = entities[i];
            if (arrayEntity === entity)
                return i;

        }
    }

    return TileEntities;
});