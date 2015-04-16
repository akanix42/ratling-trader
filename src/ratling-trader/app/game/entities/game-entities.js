define(function () {
    function GameEntities() {
        this._private = {
            entities: {}
        };
    }

    GameEntities.prototype.add = function add(entity) {
        this._private.entities[entity.id] = entity;
    };

    GameEntities.prototype.remove = function remove(entity) {
        this._private.entities[entity.id] = null;
    };

    GameEntities.prototype.toDto = function toDto() {
        var ids = Object.keys(this._private.entities);
        var entitiesDto = [];
        for (var i = 0; i < ids.length; i++) {
            var entity = this._private.entities[ids[i]];
            if (entity)
                entitiesDto.push(entity.toDto());
        }
        return entitiesDto;
    };

    return GameEntities;
})