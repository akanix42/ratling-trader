define(function () {
    function AbstractEvent() {

    }

    AbstractEvent.prototype.notifyEntity = function send(entity) {
        this.notifyTile(entity.tile, entity);
        entity.eventHandlers.notify(this);
    };
    AbstractEvent.prototype.notifyTile = function send(tile, entity) {
        tile.eventHandlers.notify(this, entity, tile);
    };

    return AbstractEvent;
});