define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var CellToCellMovement = require('game/mixins/cell-to-cell-movement');
    var MoveCommand = require('game/commands/move-command');
    var iocLoader = require('ioc-loader');

    describe('mixins - cell-to-cell movement', function () {
        it('should move an entity from one cell to the next', function test(done) {
            var originalPosition = {x: 5, y: 5};
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var testEntity = new EntityTestDataBuilder(roots.gameRoot.injector).atPosition(originalPosition);
                var cellToCellMovement = new CellToCellMovement();
                var moveCommand = new MoveCommand({x: -1, y: 1});
                var originalTile = testEntity.tile;
                var start = new Date();

                originalTile.entities.all().should.include(testEntity, "because the entity has not yet moved from this tile");

                cellToCellMovement.move(moveCommand, testEntity);
                testEntity.tile.position.should.be.like({x: 4, y: 6}, "because this is the new position");
                originalTile.entities.all().should.not.include(testEntity, "because the entity has moved to another tile");
                done(start);
            });
        });

        it('should not allow collidable entity to move onto another collidable entity', function test(done) {
            var originalPosition = {x: 5, y: 5};
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var testEntity = new EntityTestDataBuilder(roots.gameRoot.injector).atPosition(originalPosition);
                testEntity.mixins.add('collidable');
                var moveCommand = new MoveCommand({x: -1, y: 1});
                var cellToCellMovement = new CellToCellMovement();

                var otherEntity = new EntityTestDataBuilder(roots.gameRoot.injector).atTile(testEntity.tile.getNeighbor(moveCommand.direction));
                otherEntity.mixins.add('collidable');

                var start = new Date();

                cellToCellMovement.move(moveCommand, testEntity);

                testEntity.tile.position.should.be.like(originalPosition);
                done(start);
            });
        });

        it('should not allow an entity to move onto a NullTile', function test(done) {
            var originalPosition = {x: 0, y: 0};
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var testEntity = new EntityTestDataBuilder(roots.gameRoot.injector).atPosition(originalPosition);
                var moveCommand = new MoveCommand({x: -1, y: 1});
                var cellToCellMovement = new CellToCellMovement();
                var start = new Date();

                cellToCellMovement.move(moveCommand, testEntity);

                testEntity.tile.position.should.be.like(originalPosition);
                done(start);
            });
        });
        //
        //it('should respect collision', ()=> {
        //
        //});
    });
});