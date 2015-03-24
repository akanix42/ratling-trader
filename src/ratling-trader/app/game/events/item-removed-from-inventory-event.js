define(function () {
    return ItemRemovedFromInventoryEvent;

    function ItemRemovedFromInventoryEvent(item, entity) {
        this.item = item;
        this.entity = entity;
    }
});