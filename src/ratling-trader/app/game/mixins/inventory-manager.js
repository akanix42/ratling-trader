define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var ItemPickupCommand = require('game/commands/item-pickup-command');
    var DropItemsCommand = require('game/commands/drop-items-command');

    function InventoryManager() {
        AbstractMixin.apply(this);

        this.addCommandHandler(ItemPickupCommand, pickupItem);
        this.addCommandHandler(DropItemsCommand, dropItems);
    }


    function dropItems(command, entity){
        for (var i = 0; i < command.itemsToDrop.length; i++)
        {
            var item = entity.inventory.removeAt(command.itemsToDrop[i]);
            item.tile = entity.tile;
        }
    }

    InventoryManager.prototype = Object.create(AbstractMixin.prototype);

    function pickupItem(command, entity) {
        var item = entity.tile.entities.floorSpace[command.itemIndex];
        if (!item)
            return;
        entity.inventory.add(item);
        item.tile = null;
    }

    return InventoryManager;
});