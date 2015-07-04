"use strict";
var EntityInventory;

describe('EntityInventory', function () {
    beforeEach(function () {
        if (!EntityInventory)
            EntityInventory = Game.getType("entityInventory");
    });

    describe('items', function () {
        it('should return an array of all items in the inventory', function () {
            var items = [1, 2, 3];
            var inventory = new EntityInventory();
            inventory.items = items;
            expect(inventory.items).toEqual(items);
        });
    });

    describe('add', function () {
        it('should add the given item to the inventory', function () {
            var item = {test: 'test'};
            var inventory = new EntityInventory();
            inventory.add(item);
            expect(inventory.items[0]).toEqual(item);
        });
    });

    describe('removeAt', function () {
        it('should remove and return the item at the given index', function () {
            var items = [1, 2, 3];
            var inventory = new EntityInventory();
            inventory.items = items;
            expect(inventory.removeAt(1)).toEqual(2);
            expect(inventory.items[1]).toEqual(3);
        });
    });
});
