define(function () {

    function TileEntities() {
        this._private = {
            entities: [],
            airSpaceEntities: [],
            floorSpaceEntities: [],
            entitySpacesMap: new Map()
        };
    }

    TileEntities.prototype = {
        get airSpace() {
            return this._private.airSpaceEntities.slice();
        },
        get floorSpace() {
            return this._private.floorSpaceEntities.slice();
        }
    };
    TileEntities.prototype.add = function add(entity) {
        var indexOfEntity = findEntity(entity, this._private.entities);

        if (indexOfEntity === undefined) {
            this._private.entities.push(entity);

            var space =this._private[entity.space + 'SpaceEntities'];
            space.push(entity);
            this._private.entitySpacesMap.set(entity, space);
        }
        return true;
    };

    TileEntities.prototype.all = function all() {
        return this._private.entities.slice();
    };

    TileEntities.prototype.remove = function remove(entity) {
        removeArrayElementAt(findEntity(entity, this._private.entities), this._private.entities);

        var space = this._private.entitySpacesMap.get(entity);
        removeArrayElementAt(findEntity(entity, space), space);
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