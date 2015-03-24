define(function (require) {
    var iocLoader = require('ioc-loader');

    var EntityInventory = require('game/entities/entity-inventory');
//    var EntityFactory = require('game/entities/entity-factory');
    describe('models - entity inventory', function () {
        describe('.items', function () {
            it('should return an array of all items in the inventory', function () {
                var items = [1, 2, 3];
                var inventory = new EntityInventory();
                inventory.items = items;
                inventory.items.should.equal(items);
            });
        });

        describe('.add', function () {
            it('should add the given item to the inventory', function () {
                var item = {test: 'test'};
                var inventory = new EntityInventory();
                inventory.add(item);
                inventory.items[0].should.equal(item);
            });
        });

        describe('.removeAt', function () {
            it('should remove and return the item at the given index', function () {
                var items = [1, 2, 3];
                var inventory = new EntityInventory();
                inventory.items = items;
                inventory.removeAt(1).should.equal(2);
                inventory.items[1].should.equal(3);
            });
        });
    });


});