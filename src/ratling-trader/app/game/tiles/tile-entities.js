define(function () {

    function TileEntities() {
        this._private = {
            entities: []
        };
    }

    TileEntities.prototype.add = function add(entity) {
        this._private.entities.push(entity);
        return true;
    };

    TileEntities.prototype.all = function all() {
        return this._private.entities.slice();
    };

    return TileEntities;
});