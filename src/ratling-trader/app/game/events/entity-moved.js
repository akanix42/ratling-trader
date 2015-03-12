define(function (require) {
    return EntityMovedEvent;

    function EntityMovedEvent(entity, oldTile, newTile) {
        this.entity = entity;
        this.oldTile = oldTile;
        this.newTile = newTile;
    }
});