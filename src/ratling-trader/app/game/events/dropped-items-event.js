define(function () {
    function DroppedItemsEvent(entity, items) {
        this.entity = entity;
        this.items = items;
    }

    return DroppedItemsEvent;
});