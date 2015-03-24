define(function () {
    return ItemAddedToInventoryEvent;

    function ItemAddedToInventoryEvent(item, entity) {
        this.item = item;
        this.entity = entity;
    }
});