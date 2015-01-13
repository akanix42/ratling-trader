define(function () {
    'use strict';
    var entityTestDataBuilder = require('tests/helpers/entity-test-data-builder');
    var CellToCellMovement = require('game/mixins/cell-to-cell-movement');
    var MoveCommand = require('game/commands/move-command');

    describe('cell-to-cell-movement', () => {
        it('should move an entity from one cell to the next', ()=> {
            var originalPosition =  {x: 5, y: 5};
            var testEntity = entityTestDataBuilder.withPosition(originalPosition);
            var cellToCellMovement = new CellToCellMovement();
            var moveCommand = new MoveCommand({x: -1, y: 1});
            cellToCellMovement.execute('move', testEntity, moveCommand);

            var position = testEntity.getPositionManager().getPosition();
            position.should.equal({x: 4, y: 6});
        });
        //
        //it('should respect collision', ()=> {
        //
        //});
    });
});