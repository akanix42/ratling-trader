define(function (require) {
    var ItemAddedToInventoryEvent = require('game/events/item-added-to-inventory-event');
    var ItemRemovedFromInventoryEvent = require('game/events/item-removed-from-inventory-event');

    function EntityInventory() {
        this._private = {
            items: [],
            entity: null
        };
    }

    EntityInventory.prototype = {
        set entity(entity) {
            this._private.entity = entity;
        },
        get items() {
            return this._private.items;
        },
        set items(items) {
            this._private.items = items;
        },

        add: function (item) {
            this._private.items.push(item);
            if (this._private.entity)
                this._private.entity.eventHandlers.notify(new ItemAddedToInventoryEvent(item, this._private.entity));
        },

        removeAt: function (index) {
            var item = this._private.items.splice(index, 1)[0];
            if (this._private.entity)
                this._private.entity.eventHandlers.notify(new ItemRemovedFromInventoryEvent(item, this._private.entity));
            return item;
        },

    };

    return EntityInventory;
});
