define(function (require) {
    'use strict';
    var EntityTestDataBuilder = require('tests/builders/entity-test-data-builder');
    var CellToCellMovement = require('game/mixins/cell-to-cell-movement');
    var MoveCommand = require('game/commands/move-command');

    describe('cell-to-cell-movement', function () {
        it('should move an entity from one cell to the next', function test() {
            var originalPosition = {x: 5, y: 5};
            var testEntity = new EntityTestDataBuilder().atPosition(originalPosition);
            var cellToCellMovement = new CellToCellMovement();
            var moveCommand = new MoveCommand({x: -1, y: 1});
            cellToCellMovement.execute(testEntity, moveCommand);

            testEntity.tile.position.should.be.like({x: 4, y: 6});
        });

        it('should not move a collidable entity onto another collidable entity', function test(){
            var originalPosition = {x: 5, y: 5};
            var testEntity = new EntityTestDataBuilder().atPosition(originalPosition);
            var moveCommand = new MoveCommand({x: -1, y: 1});
            var cellToCellMovement = new CellToCellMovement();

            var otherEntity = new EntityTestDataBuilder().atTile(testEntity.tile.getNeighbor(moveCommand.direction));

            cellToCellMovement.execute(testEntity, moveCommand);

            testEntity.tile.position.should.be.like(originalPosition);
        });
        //
        //it('should respect collision', ()=> {
        //
        //});
    });
});