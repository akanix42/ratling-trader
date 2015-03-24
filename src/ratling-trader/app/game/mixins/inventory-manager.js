define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var ItemPickupCommand = require('game/commands/item-pickup-command');

    function InventoryManager() {
        AbstractMixin.apply(this);

        this.addCommandHandler(ItemPickupCommand);
    }

    InventoryManager.prototype = Object.create(AbstractMixin.prototype);

    InventoryManager.prototype.execute = function execute(command, entity) {
        var item = entity.tile.entities.floorSpace[command.itemIndex];
        if (!item)
            return;
        entity.inventory.add(item);
        item.tile = null;
    };

    return InventoryManager;
});