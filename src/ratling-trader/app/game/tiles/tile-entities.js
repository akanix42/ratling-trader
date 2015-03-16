define(function () {

    function TileEntities() {
        this._private = {
            entities: []
        };
    }

    TileEntities.prototype.add = function add(entity) {
        var indexOfEntity = findEntity.call(this, entity);
        if (indexOfEntity === undefined)
            this._private.entities.push(entity);

        return true;
    };

    TileEntities.prototype.all = function all() {
        return this._private.entities.slice();
    };

    TileEntities.prototype.remove = function remove(entity) {
        var indexOfEntity = findEntity.call(this, entity);
        if (indexOfEntity === undefined)
            return;

        this._private.entities.splice(indexOfEntity, 1);

    };

    function findEntity(entity) {
        var entities = this._private.entities;
        for (var i = 0; i < entities.length; i++) {
            var arrayEntity = entities[i];
            if (arrayEntity === entity)
                return i;

        }
    }

    return TileEntities;
});