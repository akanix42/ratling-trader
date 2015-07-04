"use strict";

Game.registerUnique("entityInventory", EntityInventory);

function EntityInventory(entityFactory) {
    this._ = {
        items: [],
        entity: null,
        entityFactory: entityFactory
    };
}

EntityInventory.prototype = {
    set entity(entity) {
        this._.entity = entity;
    },
    get items() {
        return this._.items;
    },
    set items(items) {
        this._.items = items;
    },

    add: function (item) {
        this._.items.push(item);
        if (this._.entity)
            new ItemAddedToInventoryEvent(item, this._.entity).notifyEntity(this._.entity);
    },

    removeAt: function (index) {
        var item = this._.items.splice(index, 1)[0];
        if (this._.entity)
            new ItemRemovedFromInventoryEvent(item, this._.entity).notifyEntity(this._.entity);
        return item;
    },
    initFrom: function (itemsData) {
        if (!itemsData) return;
        for (var i = 0; i < itemsData.length; i++)
            this.add(this._.entityFactory.create(itemsData[0]));

    }
};